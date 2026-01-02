import React from 'react';
import { X, Lock, ExternalLink, Cloud, ShieldCheck, ShieldAlert } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOwner: boolean;
  onToggleOwner: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, isOwner, onToggleOwner }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 relative shadow-2xl flex flex-col">
        
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
                    <p className="text-xs text-slate-400">Manage Settings & Subscribers</p>
                </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Database Section */}
        <div className="text-center py-6 border-b border-slate-800">
            <div className="inline-block p-4 bg-slate-800 rounded-full mb-4">
                <Cloud className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cloud Database</h3>
            <p className="text-slate-400 text-sm mb-4">
                View collected emails in your Netlify dashboard.
            </p>
            
            <a 
                href="https://app.netlify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/50 font-bold py-2 px-6 rounded-lg transition-colors text-sm"
            >
                Open Dashboard <ExternalLink className="w-4 h-4" />
            </a>
        </div>

        {/* Analytics Control */}
        <div className="py-6">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3">
                    {isOwner ? (
                        <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    ) : (
                        <ShieldAlert className="w-6 h-6 text-slate-500" />
                    )}
                    <div className="text-left">
                        <p className="text-white font-bold text-sm">Owner Mode</p>
                        <p className="text-xs text-slate-400">
                            {isOwner ? "Analytics Paused & Ads Hidden" : "Analytics Active & Ads Visible"}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={onToggleOwner}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isOwner ? 'bg-primary' : 'bg-slate-600'}`}
                >
                    <span 
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isOwner ? 'translate-x-6' : 'translate-x-0'}`} 
                    />
                </button>
            </div>
            {isOwner && (
                <p className="text-[10px] text-emerald-400 mt-2 text-center bg-emerald-500/10 p-2 rounded">
                    Safe Mode: Ads are now hidden to prevent invalid traffic.
                </p>
            )}
        </div>
        
        <div className="mt-auto pt-4 text-[10px] text-slate-500 text-center font-mono">
            System: Netlify Forms | Analytics: Local
        </div>
      </div>
    </div>
  );
};

export default AdminModal;