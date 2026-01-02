import React, { useState, useEffect } from 'react';
import { LinkItem, Category } from '../types';
import { ExternalLink, Flame, Copy, Check, MousePointerClick, Loader2 } from 'lucide-react';

// Using the same namespace as App.tsx to ensure data sync
const COUNTER_NAMESPACE = "earnvault-global-v2";

interface LinkCardProps {
  item: LinkItem;
  onLinkClick?: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ item, onLinkClick }) => {
  // Extract domain for favicon
  const domain = new URL(item.url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  
  const [copied, setCopied] = useState(false);
  const [clicks, setClicks] = useState<number | null>(null);
  const [isLoadingClicks, setIsLoadingClicks] = useState(true);

  // --- FETCH CLICK COUNT ON MOUNT ---
  useEffect(() => {
    let isMounted = true;

    const fetchClicks = async () => {
      // ⚡ Smart Strategy: Add a random delay between 0ms and 2500ms
      // This prevents all 30 cards from hitting the API at the exact same millisecond
      const randomDelay = Math.random() * 2500;
      await new Promise(resolve => setTimeout(resolve, randomDelay));

      if (!isMounted) return;

      try {
        const res = await fetch(`https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/link_${item.id}_clicks`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setClicks(data.value || 0);
            setIsLoadingClicks(false);
          }
        } else {
          // If key doesn't exist yet (404), assume 0
          if (isMounted) {
            setClicks(0);
            setIsLoadingClicks(false);
          }
        }
      } catch (error) {
        // Use 0 on network error
        if (isMounted) {
           setClicks(0);
           setIsLoadingClicks(false);
        }
      }
    };

    fetchClicks();

    return () => { isMounted = false; };
  }, [item.id]);

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
    // 1. Optimistic Update: Increase number immediately on UI
    if (clicks !== null) {
        setClicks(clicks + 1);
    } else {
        setClicks(1);
    }

    // 2. Track the click with 'keepalive' to ensure it counts even if page closes
    try {
        fetch(`https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/link_${item.id}_clicks`, {
            keepalive: true, // CRITICAL: Ensures request completes even if browser navigates away
            method: 'GET'
        }).catch(() => {}); // Silent catch
    } catch (e) {
        // Ignore errors
    }

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
             onClick={(e) => e.preventDefault()} /* Prevent link click when clicking code box */
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
           // Spacer if no code
           <div className="flex-1"></div>
        )}
        
        {/* --- CLICK COUNTER & BUTTON --- */}
        <div className="flex items-center gap-3">
            {/* Counter */}
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono" title="Total Clicks">
                <MousePointerClick className="w-3 h-3" />
                {isLoadingClicks ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                    <span>{clicks?.toLocaleString()}</span>
                )}
            </div>

            {/* Open Button */}
            <div className="flex items-center gap-1 text-xs font-bold text-primary group-hover:opacity-100 transition-all duration-300 bg-primary/10 px-2 py-1.5 rounded-lg border border-primary/20 group-hover:bg-primary group-hover:text-dark">
              OPEN <ExternalLink className="w-3 h-3" />
            </div>
        </div>
      </div>
    </a>
  );
};

export default LinkCard;