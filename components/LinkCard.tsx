import React, { useState, useEffect, useRef } from 'react';
import { LinkItem, Category } from '../types';
import { ExternalLink, Flame, Copy, Check, MousePointerClick, Loader2 } from 'lucide-react';
// Import from constants to avoid circular dependency
import { COUNTER_NAMESPACE, API_BASE_URL } from '../constants';

interface LinkCardProps {
  item: LinkItem;
  onLinkClick?: (id: string) => void;
  onGlobalClickIncrement?: () => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ item, onLinkClick, onGlobalClickIncrement }) => {
  // Safety check: if item is undefined, return null to avoid crashing the app
  if (!item) return null;

  // Extract domain for favicon
  const domain = new URL(item.url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Stats
  const [clicks, setClicks] = useState<number | null>(null);

  // --- 1. LAZY LOAD TRIGGER ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- 2. FETCH DATA WHEN VISIBLE ---
  useEffect(() => {
    if (!isVisible) return;

    // Use GET to just read the current number from the global database
    // API: https://api.counterapi.dev/v1/{namespace}/{key}
    fetch(`${API_BASE_URL}/${COUNTER_NAMESPACE}/link_${item.id}`)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Stats fetch failed');
      })
      .then(data => {
        // CounterAPI uses 'count'
        if (data && typeof data.count === 'number') setClicks(data.count);
        else setClicks(0);
      })
      .catch(() => {
        setClicks(0); // Silent fallback on error/block
      });

  }, [isVisible, item.id]);

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
    // 1. Optimistic Update (Immediate Feedback)
    setClicks(prev => (prev || 0) + 1);

    // 2. Hit Server (GLOBAL UPDATE)
    // API: https://api.counterapi.dev/v1/{namespace}/{key}/up
    fetch(`${API_BASE_URL}/${COUNTER_NAMESPACE}/link_${item.id}/up`)
      .then(r => r.json())
      .then(data => {
         // CounterAPI uses 'count'
         if(data && typeof data.count === 'number') {
             setClicks(data.count);
         }
      })
      .catch(() => {});

    // 3. Update Global Counter in Footer
    if (onGlobalClickIncrement) {
        onGlobalClickIncrement();
    }

    // 4. Parent callback
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
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono" title="Total Global Clicks">
                <MousePointerClick className="w-3 h-3" />
                {clicks === null ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                    <span>{clicks.toLocaleString()}</span>
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