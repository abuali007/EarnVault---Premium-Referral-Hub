import React from 'react';
import SEO from '../components/SEO';
import LinkCard from '../components/LinkCard';
import { LINKS_DATA } from '../constants';
import { Category } from '../types';
import { Bot, Cpu } from 'lucide-react';

interface AiToolsPageProps {
  onGlobalClickIncrement: () => void;
}

const AiToolsPage: React.FC<AiToolsPageProps> = ({ onGlobalClickIncrement }) => {
  const aiLinks = LINKS_DATA.filter(item => item.category === Category.AI);

  return (
    <>
      <SEO 
        title="Best AI Tools for Productivity & Coding"
        description="Curated list of AI tools including Manus, ElevenLabs, and Replit. Enhance your workflow with next-gen artificial intelligence."
        canonical="/ai-tools"
      />

      <div className="bg-gradient-to-b from-dark to-slate-900 pt-12 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">AI & Productivity</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Leverage the power of Artificial Intelligence. From coding assistants to realistic voice generation, these tools define the future of work.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {aiLinks.map((item) => (
            <LinkCard 
              key={item.id} 
              item={item} 
              onGlobalClickIncrement={onGlobalClickIncrement}
            />
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-4xl mx-auto border-t border-slate-800 pt-12">
            <div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                    <Cpu className="w-5 h-5 text-primary" /> For Developers
                </h3>
                <p className="text-slate-400 leading-relaxed">
                    Tools like <strong>Replit</strong> and <strong>Lovable</strong> are changing how we build software. You no longer need complex local environments; the cloud is your IDE, powered by agents that can write boilerplate code for you.
                </p>
            </div>
            <div>
                 <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                    <Cpu className="w-5 h-5 text-secondary" /> For Creators
                </h3>
                <p className="text-slate-400 leading-relaxed">
                    <strong>ElevenLabs</strong> stands out for voice synthesis. Whether you are creating audiobooks, YouTube narration, or game assets, the quality of modern AI voice is indistinguishable from human recording.
                </p>
            </div>
        </div>
      </div>
    </>
  );
};

export default AiToolsPage;