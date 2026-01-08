import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import LinkCard from '../components/LinkCard';
import FilterTabs from '../components/FilterTabs';
import { LINKS_DATA, HERO_TITLE, HERO_SUBTITLE } from '../constants';
import { Search, ShieldCheck, LayoutGrid } from 'lucide-react';
import { Category } from '../types';

interface HomePageProps {
  onGlobalClickIncrement: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGlobalClickIncrement }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);

  // Unified Data Logic
  // We filter the main list based on search and category.
  // Since LINKS_DATA in constants.ts is already ordered by Tier (Hot/Best first),
  // we don't need to manually sort them. They will appear in the correct order naturally.
  const displayLinks = LINKS_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === Category.ALL || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO 
        title="EarnVault - Verified Crypto & AI Tools Directory"
        description="Your trusted gateway to verified crypto exchanges, AI productivity tools, and smart earning platforms. Curated for safety and performance in 2026."
        canonical="/"
      />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-primary font-mono mb-6">
            <ShieldCheck className="w-3 h-3" />
            Verified & Curated for 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-slate-200 mb-6 leading-tight tracking-tight">
            {HERO_TITLE}
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {HERO_SUBTITLE}
          </p>

          <div className="relative max-w-lg mx-auto mb-4">
            <input 
              type="text" 
              placeholder="Search specifically (e.g., Binance, AI, Survey)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-4 px-6 pr-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-500 shadow-xl"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          </div>
        </div>
      </section>

      {/* --- MAIN DIRECTORY SECTION (Unified) --- */}
      <section className="container mx-auto px-4 py-8" id="directory">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-white mb-4 flex items-center justify-center gap-3">
              <LayoutGrid className="w-8 h-8 text-primary" />
              Complete Vault Directory
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Browse our full database of verified links. Use the tabs below to filter by category.
            </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex justify-center sticky top-20 z-30 bg-dark/80 backdrop-blur-md py-4 -mx-4 px-4 md:static md:bg-transparent md:p-0">
            <FilterTabs 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
            />
        </div>

        {/* The Unified Grid */}
        {displayLinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
            {displayLinks.map((item) => (
              <LinkCard 
                key={item.id} 
                item={item} 
                onGlobalClickIncrement={onGlobalClickIncrement}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
             <p className="text-slate-500">No links found for this category/search.</p>
             <button 
                onClick={() => {setSelectedCategory(Category.ALL); setSearchQuery('');}}
                className="mt-4 text-primary hover:underline"
             >
                Reset Filters
             </button>
          </div>
        )}
      </section>

      {/* SEO Content Block */}
      <section className="bg-slate-900/50 py-16 border-t border-slate-800 mt-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Why Trust EarnVault?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Verified Links</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every link on EarnVault is manually verified to ensure it leads to the official, secure domain of the service provider. We filter out scams.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Exclusive Bonuses</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our partnerships often grant you sign-up bonuses, fee discounts, or extended trials that you wouldn't get by going directly to the site.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Privacy First</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We believe in the decentralized web. We don't track your personal identity, sell your data, or spam your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;