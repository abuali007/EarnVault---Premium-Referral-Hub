import React from 'react';
import SEO from '../components/SEO';
import LinkCard from '../components/LinkCard';
import { LINKS_DATA } from '../constants';
import { Category } from '../types';
import { Wallet, PiggyBank } from 'lucide-react';

interface SavingsPageProps {
  onGlobalClickIncrement: () => void;
}

const SavingsPage: React.FC<SavingsPageProps> = ({ onGlobalClickIncrement }) => {
  const savingsLinks = LINKS_DATA.filter(item => 
    item.category === Category.SHOPPING || item.category === Category.EARNING
  );

  return (
    <>
      <SEO 
        title="Smart Savings & Passive Earning Platforms"
        description="Maximize your income with verified survey sites, cashback tools, and smart wallets. Wise, Honey, and more."
        canonical="/savings"
      />

      <div className="bg-gradient-to-b from-dark to-slate-900 pt-12 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <PiggyBank className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Smart Savings & Earning</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A penny saved is a penny earned. Discover tools that reduce your costs and platforms that pay you for your time.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savingsLinks.map((item) => (
            <LinkCard 
              key={item.id} 
              item={item} 
              onGlobalClickIncrement={onGlobalClickIncrement}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SavingsPage;