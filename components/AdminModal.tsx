import React from 'react';
import { X, Lock, ExternalLink, Cloud } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
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
                    <p className="text-xs text-slate-400">Manage Newsletter Subscribers</p>
                </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>
        </div>

        <div className="text-center py-8">
            <div className="inline-block p-4 bg-slate-800 rounded-full mb-4">
                <Cloud className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cloud Database Active</h3>
            <p className="text-slate-400 text-sm mb-6">
                Your email subscribers are now being collected securely in your Netlify dashboard. 
                You can download them as a CSV file or view them in real-time there.
            </p>
            
            <a 
                href="https://app.netlify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-600 text-dark font-bold py-3 px-6 rounded-lg transition-colors w-full justify-center"
            >
                Go to Netlify Dashboard <ExternalLink className="w-4 h-4" />
            </a>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
            System: Netlify Forms | Status: Online
        </div>
      </div>
    </div>
  );
};

export default AdminModal;