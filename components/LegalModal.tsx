import React from 'react';
import { X, Shield, Scale, AlertTriangle, FileText } from 'lucide-react';

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
            // TERMS OF USE CONTENT (Strict Owner Protection)
            <>
              {/* Critical Disclaimer Banner */}
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-start text-red-200">
                <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">STRICT FINANCIAL DISCLAIMER</h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    EarnVault is strictly an informational hub. <strong>WE ARE NOT FINANCIAL ADVISORS.</strong> Cryptocurrency and online earning platforms involve significant risk. You can lose all your invested capital. By using this site, you acknowledge that you are solely responsible for your own financial decisions and due diligence. The site owner assumes <strong>NO LIABILITY</strong> for any losses incurred.
                  </p>
                </div>
              </div>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                  <FileText className="w-4 h-4 text-primary" /> 1. Affiliate Disclosure
                </h3>
                <p>
                  Transparency is key. EarnVault participates in various affiliate marketing programs. This means we may earn a commission if you click on a link and register or make a purchase at <strong>no additional cost to you</strong>. These commissions help maintain the server and development costs of this free tool.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                   <FileText className="w-4 h-4 text-primary" /> 2. Limitation of Liability
                </h3>
                <p>
                  To the fullest extent permitted by law, EarnVault and its owner shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses resulting from:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                    <li>The use or the inability to use the service.</li>
                    <li>The failure, scam, or closure of any third-party platform listed (e.g., if an exchange halts withdrawals).</li>
                    <li>Unauthorization access to or alteration of your transmissions or data.</li>
                </ul>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                   <FileText className="w-4 h-4 text-primary" /> 3. Third-Party Links & Risks
                </h3>
                <p>
                  Our service contains links to third-party web sites (e.g., Binance, Bybit, Freecash) that are not owned or controlled by EarnVault. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites. You acknowledge and agree that EarnVault shall not be responsible or liable, directly or indirectly, for any damage or loss caused by your use of any such content or services.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                   <FileText className="w-4 h-4 text-primary" /> 4. "As Is" and "As Available"
                </h3>
                <p>
                   The Service is provided to you "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Owner expressly disclaims all warranties, whether express, implied, statutory, or otherwise.
                </p>
              </section>
            </>
          ) : (
            // PRIVACY POLICY CONTENT
            <>
              <section>
                <h3 className="text-lg font-bold text-white mb-2">1. Data Collection & Anonymity</h3>
                <p>
                  We respect your right to privacy. We do not automatically collect personally identifiable information (PII) like your name or address when you browse the site.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                    <li><strong>Analytics:</strong> We use anonymous counters to track aggregate clicks and visits. This data is not linked to your personal identity.</li>
                    <li><strong>Newsletter:</strong> If you voluntarily subscribe, your email is stored securely via Netlify Forms and is used solely for sending updates. We never sell your email.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">2. Cookies & Local Storage</h3>
                <p>
                  We use "Local Storage" technology to enhance your experience (e.g., remembering if you are in 'Owner Mode' or if you have already subscribed). This data remains on your device and is not transferred to our servers for analysis.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">3. Third-Party Privacy</h3>
                <p>
                  Once you leave our website or are redirected to a third-party website or application (e.g., clicking a referral link), you are no longer governed by this Privacy Policy or our website’s Terms of Service. We encourage you to read the privacy statements of those platforms (e.g., Binance, Google).
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2">4. Security</h3>
                <p>
                  We implement industry-standard security measures to maintain the safety of your email information. However, no method of transmission over the Internet is 100% secure.
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
            I Accept & Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;