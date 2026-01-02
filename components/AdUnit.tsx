import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface AdUnitProps {
  position: 'header' | 'in-grid' | 'footer';
  adSrc?: string; 
  className?: string;
  isOwner?: boolean; // New prop to check if user is owner
}

const AdUnit: React.FC<AdUnitProps> = ({ position, adSrc, className = '', isOwner = false }) => {
  
  // If Owner, render a "Safe Mode" box instead of the Ad
  if (isOwner) {
    const ownerClasses = {
        header: "w-full max-w-[728px] h-[90px] mx-auto my-6 hidden md:flex items-center justify-center",
        'in-grid': "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 w-full h-[100px] sm:h-[120px] my-4 flex items-center justify-center",
        footer: "w-full max-w-[728px] h-[90px] mx-auto my-8 flex items-center justify-center"
    };

    return (
        <div className={`${ownerClasses[position]} ${className} bg-red-900/10 border border-red-900/30 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden`}>
             {/* Diagonal stripes pattern */}
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '10px 10px'}}></div>
            <div className="z-10 flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Ad Hidden (Owner Mode)</span>
            </div>
        </div>
    );
  }

  // Styles based on position (Standard user view)
  const containerClasses = {
    header: "w-full max-w-[728px] h-[90px] mx-auto my-6 hidden md:flex items-center justify-center",
    'in-grid': "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 w-full h-[100px] sm:h-[120px] my-4 flex items-center justify-center",
    footer: "w-full max-w-[728px] h-[90px] mx-auto my-8 flex items-center justify-center"
  };

  return (
    <div className={`${containerClasses[position]} ${className} bg-slate-800/30 border border-dashed border-slate-700 rounded-xl overflow-hidden relative group transition-all hover:border-slate-600`}>
      
      {adSrc ? (
        <iframe 
          src={adSrc}
          data-aa={adSrc.split('/')[3]} 
          title={`Ad ${position}`}
          className="w-full h-full border-0 overflow-hidden"
          scrolling="no"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-600 text-xs uppercase tracking-widest font-mono p-4 text-center w-full h-full hover:bg-slate-800/50 transition-colors cursor-pointer">
          <span className="mb-1 block text-slate-500 font-bold">Advertise Here</span>
          <span className="opacity-50">({position})</span>
        </div>
      )}
      
    </div>
  );
};

export default AdUnit;