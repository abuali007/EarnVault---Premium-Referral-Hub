import React from 'react';
import { Frown } from 'lucide-react';

interface AdUnitProps {
  position: 'header' | 'in-grid' | 'footer';
  adSrc?: string; 
  className?: string;
  // isOwner prop removed as it is no longer used
}

const AdUnit: React.FC<AdUnitProps> = ({ position, adSrc, className = '' }) => {
  
  // Standard User Mode with AdBlock Detection Layering
  const containerClasses = {
    header: "w-full max-w-[728px] h-[90px] mx-auto my-6 hidden md:flex",
    'in-grid': "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 w-full h-[100px] sm:h-[120px] my-4 flex",
    footer: "w-full max-w-[728px] h-[90px] mx-auto my-8 flex"
  };

  return (
    <div className={`${containerClasses[position]} ${className} relative rounded-xl overflow-hidden bg-dark border border-slate-800`}>
      
      {/* --- LAYER 1: AD BLOCK WARNING (Background Layer) --- */}
      {/* This layer is visible ONLY if the iframe below fails to load or is removed by AdBlocker */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-slate-900/80 border border-slate-800 z-0">
         <div className="flex items-center gap-2 mb-1 animate-pulse">
            <Frown className="w-6 h-6 text-slate-400" />
            <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">I am sad...</span>
         </div>
         <p className="text-slate-500 text-xs font-medium mt-1">
           You make me lose support by blocking ads. <br/>
           Please enable ads to help me :'(
         </p>
      </div>

      {/* --- LAYER 2: REAL A-ADS IFRAME (Top Layer) --- */}
      {/* 
          CRITICAL: "bg-dark" class gives the iframe a background color.
          If the ad loads successfully, this opaque layer sits ON TOP of the warning (z-10), hiding it.
          If AdBlocker blocks the request, the iframe often disappears or collapses, revealing Layer 1.
      */}
      {adSrc && (
        <iframe 
          src={adSrc}
          data-aa={adSrc.split('/')[3]} 
          title={`Ad ${position}`}
          className="absolute inset-0 w-full h-full border-0 z-10 bg-dark"
          scrolling="no"
          loading="lazy"
        />
      )}
      
    </div>
  );
};

export default AdUnit;