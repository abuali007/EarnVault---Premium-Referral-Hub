import React from 'react';
import SEO from '../components/SEO';
import { Shield, Users, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="About EarnVault - Our Mission"
        description="Learn about the team behind EarnVault and our mission to provide a safe, verified directory of digital assets and earning platforms."
        canonical="/about"
      />

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">About EarnVault</h1>
        
        <div className="prose prose-invert prose-lg text-slate-300">
          <p className="text-xl leading-relaxed mb-8">
            EarnVault was founded with a single mission: to cut through the noise of the digital economy. In a world filled with "get rich quick" schemes and unverified links, we provide a sanctuary of trust.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-card p-6 rounded-xl border border-slate-700">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Safety First</h3>
                <p className="text-slate-400 text-sm">
                    We manually verify every link. We check for SSL certificates, domain reputation, and community feedback before listing any platform.
                </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-slate-700">
                <Target className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Quality Over Quantity</h3>
                <p className="text-slate-400 text-sm">
                    We don't list everything. We list what works. Our directory is curated to feature industry leaders and rising stars with proven utility.
                </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">Our Philosophy</h2>
          <p className="mb-6">
            The digital landscape of 2026 is complex. Crypto exchanges, AI agents, and earning platforms are merging. Navigating this requires a guide. EarnVault is that guide.
          </p>
          <p>
            Whether you are a trader looking for the lowest fees on <strong>Binance</strong>, a developer looking for the best AI assistance via <strong>Manus</strong>, or a freelancer looking to save on international transfers with <strong>Wise</strong>, we have a verified path for you.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;