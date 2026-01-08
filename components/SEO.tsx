import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    // 1. Update Title
    document.title = `${title} | EarnVault`;

    // 2. Helper to update/create meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Helper to update/create link tags
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 4. Update Standard Meta Tags
    updateMeta('description', description);
    
    // 5. Update Open Graph
    updateMeta('og:title', `${title} | EarnVault`, 'property');
    updateMeta('og:description', description, 'property');
    
    // 6. Update Twitter
    updateMeta('twitter:title', `${title} | EarnVault`, 'property');
    updateMeta('twitter:description', description, 'property');

    // 7. Update Canonical URL
    const baseUrl = 'https://earnvault.netlify.app';
    const fullUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;
    
    updateLink('canonical', fullUrl);
    updateMeta('og:url', fullUrl, 'property');
    updateMeta('twitter:url', fullUrl, 'property');

  }, [title, description, canonical]);

  return null;
};

export default SEO;