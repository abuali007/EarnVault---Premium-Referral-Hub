import React, { useState, useMemo, useEffect } from 'react';
import { Search, Menu, X, ArrowUp, Lock, Share2, Check } from 'lucide-react';
import Logo from './components/Logo';
import FilterTabs from './components/FilterTabs';
import LinkCard from './components/LinkCard';
import EmailModal from './components/EmailModal';
import AdminModal from './components/AdminModal';
import LegalModal, { LegalType } from './components/LegalModal';
import ContactModal from './components/ContactModal';
import { LINKS_DATA, HERO_TITLE, HERO_SUBTITLE } from './constants';
import { Category } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalType>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  // Handle scroll for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsUrlCopied(true);
    setTimeout(() => setIsUrlCopied(false), 2000);
  };

  // Filter Logic
  const filteredLinks = useMemo(() => {
    return LINKS_DATA.filter(item => {
      const matchesCategory = selectedCategory === Category.ALL || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-dark">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] opacity-30"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-dark/80 border-b border-slate-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Logo />
          
          {/* Desktop Search */}
          <div className="hidden md:block relative w-96">
            <input 
              type="text" 
              placeholder="Search platforms, coins, or services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2.5 px-5 pr-12 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          </div>

          <div className="flex items-center gap-3">
             <button
                onClick={handleShare}
                className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors mr-2"
                title="Share Website"
            >
                {isUrlCopied ? <Check className="w-5 h-5 text-primary" /> : <Share2 className="w-5 h-5" />}
            </button>
             <button 
              onClick={() => setIsEmailModalOpen(true)}
              className="hidden md:flex bg-primary hover:bg-emerald-600 text-dark font-bold py-2 px-6 rounded-full transition-colors text-sm"
            >
              Join Newsletter
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 p-4 bg-dark/95 backdrop-blur absolute w-full animate-fade-in z-50">
             <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 pr-10 text-white focus:outline-none focus:border-primary"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>
             <button
                onClick={handleShare}
                className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg mb-2 flex items-center justify-center gap-2 border border-slate-700"
            >
                {isUrlCopied ? <Check className="w-4 h-4 text-primary" /> : <Share2 className="w-4 h-4" />}
                {isUrlCopied ? 'Link Copied!' : 'Share Website'}
            </button>
            <button 
              onClick={() => { setIsEmailModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full bg-primary text-dark font-bold py-3 rounded-lg"
            >
              Join Newsletter
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-slate-200 mb-6 leading-tight animate-fade-in tracking-tight">
            {HERO_TITLE}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {HERO_SUBTITLE}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-primary/80 animate-fade-in delay-100">
             <span className="bg-primary/5 px-3 py-1 rounded border border-primary/20">#Crypto</span>
             <span className="bg-primary/5 px-3 py-1 rounded border border-primary/20">#PassiveIncome</span>
             <span className="bg-primary/5 px-3 py-1 rounded border border-primary/20">#AI_Tools</span>
             <span className="bg-primary/5 px-3 py-1 rounded border border-primary/20">#2026_Top</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-dark/90 backdrop-blur-sm py-4 border-b border-slate-800/50">
        <div className="container mx-auto">
          <FilterTabs selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>
      </section>

      {/* Grid Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {filteredLinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredLinks.map((item) => (
              <LinkCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-slate-800 mb-4">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
            <p className="text-slate-500">Try adjusting your search or category.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory(Category.ALL);}}
              className="mt-4 text-primary hover:underline"
            >
              View All
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-dark py-12 mt-12 relative">
        <div className="container mx-auto px-4 text-center">
          <Logo />
          <p className="mt-4 text-slate-500 max-w-md mx-auto text-sm">
            The #1 premium hub for verified referral links. All platforms are curated to ensure safety and profitability.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <button onClick={() => setLegalModalType('privacy')} className="hover:text-primary transition-colors">Privacy Policy</button>
            <button onClick={() => setLegalModalType('terms')} className="hover:text-primary transition-colors">Terms of Use</button>
            <button onClick={() => setIsContactModalOpen(true)} className="hover:text-primary transition-colors">Contact Us</button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            <p className="text-xs text-slate-600">
              © 2026 EarnVault. All rights reserved.
            </p>
             <button 
                onClick={() => setIsAdminModalOpen(true)}
                className="opacity-10 hover:opacity-50 transition-opacity"
                title="Admin Access"
             >
                 <Lock className="w-3 h-3 text-slate-500" />
             </button>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-primary text-dark rounded-full shadow-lg transition-all duration-300 z-40 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Modals */}
      <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
      <AdminModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
      <LegalModal isOpen={!!legalModalType} type={legalModalType} onClose={() => setLegalModalType(null)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default App;
