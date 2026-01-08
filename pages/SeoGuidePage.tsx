import React from 'react';
import SEO from '../components/SEO';
import { Layers, Search, Code } from 'lucide-react';

const SeoGuidePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Modern SEO Architecture Guide 2026"
        description="Understanding how modern single-page applications (SPAs) achieve high search engine ranking through semantic HTML and proper routing."
        canonical="/guides/seo"
      />

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Modern SEO Architecture</h1>
        <p className="text-xl text-slate-400 mb-12">
            How we built EarnVault to be fast, responsive, and search-engine friendly.
        </p>
        
        <div className="space-y-12">
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <Layers className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-white">1. Semantic Structure</h2>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                    Search engines are sophisticated, but they still rely on structure. We use semantic HTML5 tags like <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;article&gt;</code>. This helps crawlers understand the hierarchy of information, prioritizing the main content over navigation or footers.
                </p>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <Search className="w-6 h-6 text-secondary" />
                    <h2 className="text-2xl font-bold text-white">2. Dynamic Metadata Injection</h2>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                    Even in a React application, every page needs a unique identity. We utilize a custom <strong>SEO Hook</strong> to dynamically inject the <code>&lt;title&gt;</code> and <code>&lt;meta name="description"&gt;</code> tags into the DOM immediately when a user navigates to a new route. This ensures that a link to <em>/trading</em> looks distinct to Google compared to <em>/about</em>.
                </p>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <Code className="w-6 h-6 text-purple-500" />
                    <h2 className="text-2xl font-bold text-white">3. Client-Side Routing</h2>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                    Instead of reloading the browser for every page click (which is slow), we use Client-Side Routing. However, we ensure that every route has a distinct URL. This allows users to bookmark specific pages and allows search engines to index deep content within the application.
                </p>
            </section>
        </div>
      </div>
    </>
  );
};

export default SeoGuidePage;