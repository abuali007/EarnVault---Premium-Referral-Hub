import React, { useState } from 'react';
import { X, Mail, CheckCircle, Loader2, Sparkles } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen) return null;

  // Helper to encode data for Netlify
  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Submit to Netlify Forms
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "newsletter", email: email }),
    })
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setEmail('');
        }, 3000);
      })
      .catch((error) => {
        console.error("Submission error:", error);
        alert("Something went wrong. Please try again.");
        setStatus('idle');
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-slate-700 rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-slide-up overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8 relative z-10">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20 rotate-3">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">Join the Insiders</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Get exclusive airdrop alerts, new high-yield platforms, and AI tools delivered to your inbox weekly.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center animate-fade-in relative z-10">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-white font-bold text-xl mb-1">You're In!</h3>
            <p className="text-emerald-400/80 text-sm">Welcome to the community.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10" name="newsletter" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="newsletter" />
            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-dark/50 border border-slate-700 rounded-xl px-4 py-4 pl-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600 group-hover:border-slate-600"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Subscribe Free <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-600">
              Your email is secure with us. No spam.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailModal;