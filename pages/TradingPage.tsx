import React from 'react';
import SEO from '../components/SEO';
import LinkCard from '../components/LinkCard';
import { LINKS_DATA } from '../constants';
import { Category } from '../types';
import { AlertTriangle, TrendingUp } from 'lucide-react';

interface TradingPageProps {
  onGlobalClickIncrement: () => void;
}

const TradingPage: React.FC<TradingPageProps> = ({ onGlobalClickIncrement }) => {
  const tradingLinks = LINKS_DATA.filter(item => item.category === Category.CRYPTO);

  return (
    <>
      <SEO 
        title="Top Crypto Trading Platforms & Exchanges 2026"
        description="Compare the best cryptocurrency exchanges like Binance, Bybit, and OKX. Verified links with sign-up bonuses and low-fee structures."
        canonical="/trading"
      />

      <div className="bg-gradient-to-b from-dark to-slate-900 pt-12 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Crypto Trading Platforms</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Access high-liquidity markets. Whether you are a spot trader, a futures expert, or an automated bot user, these are the industry standards.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Educational Intro */}
        <div className="bg-card border border-slate-700 rounded-2xl p-6 mb-12 max-w-5xl mx-auto">
          <div className="flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Risk Warning</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Cryptocurrency trading involves substantial risk. Leverage trading (futures) can lead to the total loss of your funds. 
                Always use 2-Factor Authentication (2FA) and never share your private keys. The platforms listed below are reputable, but you remain responsible for your asset security.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tradingLinks.map((item) => (
            <LinkCard 
              key={item.id} 
              item={item} 
              onGlobalClickIncrement={onGlobalClickIncrement}
            />
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-slate-400 space-y-6">
          <h2 className="text-2xl font-bold text-white">How to Choose an Exchange?</h2>
          <p>
            When selecting a platform from the list above, consider <strong>Fees</strong> and <strong>Liquidity</strong>. 
            Binance and Bybit generally offer the deepest liquidity, ensuring your orders fill at the price you want. 
            For US residents, ensure you are using a compliant platform or decentralized alternatives.
          </p>
        </div>
      </div>
    </>
  );
};

export default TradingPage;