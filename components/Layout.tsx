import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Share2, Check, ArrowUp, Zap, Wallet } from 'lucide-react';
import Logo from './Logo';
import EmailModal from './EmailModal';
import LegalModal, { LegalType } from './LegalModal';
import ContactModal from './ContactModal';
import AdUnit from './AdUnit';

// ==========================================
// 🟢 PASTE YOUR A-ADS LINKS HERE 🟢
// ==========================================
const AD_URLS = {
  HEADER: "https://acceptable.a-ads.com/2422860/?size=Adaptive",
  FOOTER: "https://acceptable.a-ads.com/2422860/?size=Adaptive"
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalType>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Scroll Handler
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trading', path: '/trading' },
    { name: 'AI Tools', path: '/ai-tools' },
    { name: 'Savings', path: '/savings' },
    { name: 'About', path: '/about' },
  ];

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
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
             <button
                onClick={handleShare}
                className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors mr-2"
                title="Share Page"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 p-4 bg-dark/95 backdrop-blur absolute w-full animate-fade-in z-50 shadow-2xl">
            <nav className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`py-3 px-4 rounded-lg font-medium ${
                    location.pathname === link.path 
                      ? 'bg-slate-800 text-primary' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <button 
              onClick={() => { setIsEmailModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full bg-primary text-dark font-bold py-3 rounded-lg"
            >
              Join Newsletter
            </button>
          </div>
        )}
      </header>

      {/* AD SLOT 1: Header */}
      <div className="container mx-auto px-4">
        <AdUnit position="header" adSrc={AD_URLS.HEADER} />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* AD SLOT 3: Footer Area */}
      <div className="container mx-auto px-4">
        <AdUnit position="footer" adSrc={AD_URLS.FOOTER} />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-dark py-12 relative mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <Logo />
              <p className="mt-4 text-slate-500 text-sm leading-relaxed">
                The trusted ecosystem for verified digital assets, trading tools, and AI productivity software.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/trading" className="hover:text-primary transition-colors">Crypto Trading</Link></li>
                <li><Link to="/ai-tools" className="hover:text-primary transition-colors">AI & Productivity</Link></li>
                <li><Link to="/savings" className="hover:text-primary transition-colors">Smart Savings</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/guides/seo" className="hover:text-primary transition-colors">SEO Architecture</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><button onClick={() => setIsContactModalOpen(true)} className="hover:text-primary transition-colors">Contact Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => setLegalModalType('privacy')} className="hover:text-primary transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setLegalModalType('terms')} className="hover:text-primary transition-colors">Terms of Use</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-xs text-slate-600">
              © 2026 EarnVault. All rights reserved. Not financial advice.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-primary text-dark rounded-full shadow-lg transition-all duration-300 z-40 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Modals */}
      <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
      <LegalModal isOpen={!!legalModalType} type={legalModalType} onClose={() => setLegalModalType(null)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default Layout;