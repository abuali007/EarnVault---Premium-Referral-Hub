import React, { useState, useEffect, useRef } from 'react';
import { LinkItem, Category } from '../types';
import { ExternalLink, Flame, Copy, Check, MousePointerClick, Loader2 } from 'lucide-react';

// NAMESPACE MUST REMAIN CONSTANT TO PRESERVE DATA
const COUNTER_NAMESPACE = "earnvault-official-ledger-v1";

interface LinkCardProps {
  item: LinkItem;
  onLinkClick?: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ item, onLinkClick }) => {
  // Extract domain for favicon
  const domain = new URL(item.url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false); // For lazy loading
  
  // Initialize clicks from local storage first (Instant UI)
  const [clicks, setClicks] = useState<number | null>(() => {
    const saved = localStorage.getItem(`ev_link_${item.id}_clicks`);
    return saved ? parseInt(saved, 10) : null;
  });
  
  const [isLoadingClicks, setIsLoadingClicks] = useState(clicks === null);

  // --- 1. LAZY LOAD TRIGGER (Intersection Observer) ---
  // Only start fetching when the user scrolls to this card
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- 2. FETCH DATA ONLY WHEN VISIBLE ---
  useEffect(() => {
    if (!isVisible) return; // Don't fetch if not on screen

    let isMounted = true;

    const fetchClicks = async () => {
      try {
        const res = await fetch(`https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/link_${item.id}_clicks`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.value > 0) {
            setClicks(data.value);
            localStorage.setItem(`ev_link_${item.id}_clicks`, data.value.toString());
            setIsLoadingClicks(false);
          } else if (isMounted && clicks === null) {
             setClicks(0);
             setIsLoadingClicks(false);
          } else {
             setIsLoadingClicks(false);
          }
        } else {
          // If 404/Error, stop loading, stick to cache if exists
          if (isMounted) setIsLoadingClicks(false);
        }
      } catch (error) {
        // Network error (AdBlock), stick to cache
        if (isMounted) setIsLoadingClicks(false);
      }
    };

    fetchClicks();

    return () => { isMounted = false; };
  }, [isVisible, item.id]); // Dependency on isVisible

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.code) {
      navigator.clipboard.writeText(item.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLinkClick = () => {
    // 1. Optimistic Update
    const newCount = (clicks || 0) + 1;
    setClicks(newCount);
    localStorage.setItem(`ev_link_${item.id}_clicks`, newCount.toString());

    // 2. Track (Fire & Forget)
    try {
        fetch(`https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/link_${item.id}_clicks`, {
            keepalive: true,
            method: 'GET'
        }).catch(() => {});
    } catch (e) {}

    // 3. Trigger parent handler
    if (onLinkClick) {
      onLinkClick(item.id);
    }
  };

  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.CRYPTO: return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case Category.AI: return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case Category.EARNING: return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <a 
      ref={cardRef}
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleLinkClick}
      className="group relative flex flex-col p-4 bg-card rounded-2xl border border-slate-700 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:-translate-y-1 h-full"
    >
      {/* Hot Badge */}
      {item.isHot && (
        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-10 animate-pulse">
          <Flame className="w-3 h-3 fill-white" />
          HOT
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="relative w-12 h-12 rounded-xl bg-dark border border-slate-700 p-2 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
          <img 
            src={faviconUrl} 
            alt={item.name} 
            className="w-full h-full object-contain"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/64/64?blur=10';
            }}
          />
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-md border font-medium ${getCategoryColor(item.category)}`}>
          {item.category}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-slate-400 leading-snug line-clamp-2 mb-3">
          {item.description}
        </p>
      </div>

      <div className="mt-auto pt-3 border-t border-slate-700/50 flex items-center justify-between gap-2">
        {item.code ? (
           <div 
             className="flex-1 max-w-[50%] bg-dark rounded-lg px-2 py-1.5 flex items-center justify-between border border-slate-700 z-20"
             onClick={(e) => e.preventDefault()}
           >
             <span className="text-xs font-mono text-slate-300 truncate mr-2 select-all">{item.code}</span>
             <button 
              onClick={handleCopy}
              className="text-slate-400 hover:text-white transition-colors"
              title="Copy Code"
             >
               {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
             </button>
           </div>
        ) : (
           <div className="flex-1"></div>
        )}
        
        {/* --- CLICK COUNTER & BUTTON --- */}
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono" title="Total Clicks">
                <MousePointerClick className="w-3 h-3" />
                {isLoadingClicks ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                    <span>{(clicks || 0).toLocaleString()}</span>
                )}
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-primary group-hover:opacity-100 transition-all duration-300 bg-primary/10 px-2 py-1.5 rounded-lg border border-primary/20 group-hover:bg-primary group-hover:text-dark">
              OPEN <ExternalLink className="w-3 h-3" />
            </div>
        </div>
      </div>
    </a>
  );
};

export default LinkCard;