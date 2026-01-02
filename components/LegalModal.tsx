import React from 'react';
import { X, Shield, Scale, AlertTriangle, FileText, Lock, Globe } from 'lucide-react';

export type LegalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  isOpen: boolean;
  type: LegalType;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? "Privacy Policy & Data" : "Terms & Disclaimer";
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
            // TERMS OF USE CONTENT (Strict Owner Protection)
            <>
              {/* Critical Disclaimer Banner */}
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-start text-red-200">
                <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">STRICT FINANCIAL DISCLAIMER</h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    EarnVault is strictly an informational aggregator. <strong>WE ARE NOT FINANCIAL ADVISORS.</strong> Cryptocurrency, AI investments, and online earning platforms involve significant risk. You can lose all your invested capital. By using this site, you acknowledge that you are solely responsible for your own financial decisions. The site owner assumes <strong>NO LIABILITY</strong> for any losses incurred.
                  </p>
                </div>
              </div>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                  <FileText className="w-4 h-4 text-primary" /> 1. Service Description
                </h3>
                <p>
                  EarnVault acts as a directory for third-party platforms. We do not own, operate, or control the websites listed (e.g., Binance, Freecash). We verify links at the time of posting, but platforms may change their policies or shut down without notice.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                   <FileText className="w-4 h-4 text-primary" /> 2. Affiliate Disclosure
                </h3>
                <p>
                  Transparency is our priority. Some links on this website are referral or affiliate links. This means if you click on a link and make a purchase or sign up, EarnVault may receive a commission at <strong>no extra cost to you</strong>. This supports the maintenance of our servers and allows us to keep this service free.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                   <FileText className="w-4 h-4 text-primary" /> 3. Limitation of Liability
                </h3>
                <p>
                  To the fullest extent permitted by law, EarnVault shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                    <li>Errors, mistakes, or inaccuracies of content.</li>
                    <li>Personal injury or property damage resulting from your access to our service.</li>
                    <li>Any unauthorized access to our secure servers.</li>
                    <li>The failure of any third-party platform listed (e.g., "rug pulls" or bankruptcy).</li>
                </ul>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                   <FileText className="w-4 h-4 text-primary" /> 4. Updates to Terms
                </h3>
                <p>
                   We reserve the right to modify these terms at any time. Your continued use of the website following any changes indicates your acceptance of the new Terms.
                </p>
              </section>
            </>
          ) : (
            // PRIVACY POLICY CONTENT
            <>
              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                    <Globe className="w-4 h-4 text-emerald-500" /> 1. Anonymous Usage
                </h3>
                <p>
                  You can browse EarnVault without revealing any personal information. We do not collect your name, address, or phone number automatically.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                    <Lock className="w-4 h-4 text-emerald-500" /> 2. Data Collection (Clicks & Visits)
                </h3>
                <p>
                  To improve our service, we collect <strong>anonymous</strong> statistical data:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                    <li><strong>Visit Counters:</strong> We count how many times pages are viewed to understand global traffic trends.</li>
                    <li><strong>Click Counters:</strong> We track how many times specific referral links are clicked to identify popular platforms.</li>
                </ul>
                <p className="mt-2 text-xs text-slate-500">
                    * This data is aggregated and does not identify individual users.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                    <Shield className="w-4 h-4 text-emerald-500" /> 3. Local Storage & Cookies
                </h3>
                <p>
                  We use "Local Storage" technology on your browser to enhance performance. This allows the site to remember the latest statistics (like visit counts) so they load instantly on your next visit. This data resides on your device, not our servers.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                    <FileText className="w-4 h-4 text-emerald-500" /> 4. Newsletter Subscription
                </h3>
                <p>
                  If you choose to subscribe to our newsletter, your email address is securely stored via Netlify Forms. We use this strictly to send you updates about new earning opportunities. We will never sell or share your email with third parties. You can unsubscribe at any time.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 rounded-b-2xl flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-primary hover:bg-emerald-600 text-dark font-bold rounded-lg transition-colors text-sm shadow-lg shadow-primary/20"
          >
            I Acknowledge & Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;