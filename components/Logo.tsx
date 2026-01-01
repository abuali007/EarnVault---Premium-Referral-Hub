import React from 'react';
import { Wallet, Zap } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer select-none">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative bg-dark rounded-full p-2 border border-slate-700">
            <Wallet className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
        </div>
        <div className="absolute -top-1 -right-1">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-display font-bold text-2xl tracking-tight text-white leading-none">
          Earn<span className="text-primary">Vault</span>
        </span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mt-1">
          Premium Referral Hub
        </span>
      </div>
    </div>
  );
};

export default Logo;
