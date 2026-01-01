import React from 'react';
import { X, Shield, Scale, AlertTriangle } from 'lucide-react';

export type LegalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  isOpen: boolean;
  type: LegalType;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? "Privacy Policy" : "Terms of Use & Disclaimer";
  const Icon = isPrivacy ? Shield : Scale;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl flex flex-col max-h-[85vh] shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900 rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isPrivacy ? 'bg-emerald-500/10' : 'bg-blue-500/10'}`}>
              <Icon className={`w-6 h-6 ${isPrivacy ? 'text-emerald-500' : 'text-blue-500'}`} />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 text-slate-300 leading-relaxed space-y-6 text-sm custom-scrollbar">
          
          {!isPrivacy ? (
            // TERMS OF USE CONTENT (Owner Protection Focus)
            <>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-3 items-start text-yellow-200">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Financial Disclaimer (Read Carefully)</h4>
                  <p className="text-xs opacity-90">
                    EarnVault is an informational aggregator. We are NOT financial advisors. 
                    Cryptocurrency trading and online investments carry high risks. 
                    <strong>You are solely responsible for your financial decisions.</strong> 
                    The site owner assumes NO liability for any losses incurred.
                  </p>
                </div>
              </div>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h3>
                <p>By accessing and using EarnVault, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">2. Affiliate Disclosure</h3>
                <p>EarnVault contains affiliate links. This means if you click on a link and register or make a purchase, the site owner may receive a commission at no extra cost to you. This supports the maintenance of our curated lists.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">3. Limitation of Liability</h3>
                <p>In no event shall the owner of EarnVault be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EarnVault, even if notified of the possibility of such damage.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">4. Third-Party Links</h3>
                <p>EarnVault has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site (e.g., Binance, Bybit). The inclusion of any link does not imply endorsement by EarnVault of the site. Use of any such linked website is at the user's own risk.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">5. No Guarantees</h3>
                <p>We do not guarantee any specific earnings or results. "Passive Income" opportunities mentioned are subject to market conditions and individual effort.</p>
              </section>
            </>
          ) : (
            // PRIVACY POLICY CONTENT
            <>
              <section>
                <h3 className="text-lg font-bold text-white mb-2">1. Data Collection</h3>
                <p>We prioritize your anonymity. We do not collect personal usage data automatically. If you choose to subscribe to our newsletter, your email address is stored securely. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">2. Local Storage</h3>
                <p>To improve your experience, we may use your browser's Local Storage to save your preferences (such as bookmarking a link or email subscription status). This data stays on your device.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">3. Third-Party Privacy</h3>
                <p>Once you leave our website or are redirected to a third-party website or application (e.g., clicking a referral link), you are no longer governed by this Privacy Policy or our website’s Terms of Service. We encourage you to read their privacy statements.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">4. Security</h3>
                <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
              </section>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 rounded-b-2xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
