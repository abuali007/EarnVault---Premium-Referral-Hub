import React from 'react';
import { LinkItem, Category } from '../types';
import { ExternalLink, Flame, Copy, Check } from 'lucide-react';

interface LinkCardProps {
  item: LinkItem;
}

const LinkCard: React.FC<LinkCardProps> = ({ item }) => {
  // Extract domain for favicon
  const domain = new URL(item.url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.code) {
      navigator.clipboard.writeText(item.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
           <div className="flex-1 bg-dark rounded-lg px-2 py-1.5 flex items-center justify-between border border-slate-700">
             <span className="text-xs font-mono text-slate-300 truncate mr-2">{item.code}</span>
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
        
        <div className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          REGISTER <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
};

export default LinkCard;