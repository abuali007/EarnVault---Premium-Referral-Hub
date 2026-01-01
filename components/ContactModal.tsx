import React, { useState } from 'react';
import { X, Mail, Copy, Check, MessageSquare, Briefcase, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORT_EMAIL = "azd7020@gmail.com";

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('General Inquiry');

  if (!isOpen) return null;

  const topics = [
    { id: 'Business Partnership', icon: Briefcase, label: 'Partnership & Ads' },
    { id: 'Technical Support', icon: HelpCircle, label: 'Help & Support' },
    { id: 'Report Issue', icon: AlertCircle, label: 'Report a Link' },
    { id: 'General Inquiry', icon: MessageSquare, label: 'General Inquiry' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPPORT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenEmail = () => {
    const subject = encodeURIComponent(`EarnVault: ${selectedTopic}`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}`;
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg relative shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm z-10">
          <div>
            <h2 className="text-2xl font-display font-bold text-white">Get in Touch</h2>
            <p className="text-slate-400 text-sm">We typically reply within 24 hours.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 z-10">
          
          {/* Email Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Official Support</p>
                <p className="text-white font-mono text-sm sm:text-base">{SUPPORT_EMAIL}</p>
              </div>
            </div>
            <button 
              onClick={handleCopy}
              className="p-2 text-slate-500 hover:text-white transition-colors relative"
              title="Copy Email"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Topic Selection */}
          <div>
            <label className="block text-slate-400 text-sm mb-3">What is this regarding?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.map((topic) => {
                const Icon = topic.icon;
                const isSelected = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-all text-left ${
                      isSelected 
                      ? 'bg-secondary/10 border-secondary text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-secondary' : 'text-slate-500'}`} />
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 pt-0 z-10">
          <button 
            onClick={handleOpenEmail}
            className="w-full bg-white hover:bg-slate-200 text-dark font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            Start Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-center text-[10px] text-slate-600 mt-3">
            Clicking this will open your default email client with a pre-filled subject.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ContactModal;
