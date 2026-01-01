import React from 'react';
import { Category } from '../types';
import { Bitcoin, Bot, DollarSign, ShoppingBag, LayoutGrid } from 'lucide-react';

interface FilterTabsProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ selectedCategory, onSelectCategory }) => {
  const tabs = [
    { id: Category.ALL, icon: LayoutGrid },
    { id: Category.CRYPTO, icon: Bitcoin },
    { id: Category.EARNING, icon: DollarSign },
    { id: Category.AI, icon: Bot },
    { id: Category.SHOPPING, icon: ShoppingBag },
  ];

  return (
    <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar px-2 sm:justify-center">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isSelected = selectedCategory === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border
              ${isSelected 
                ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                : 'bg-card border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}
            `}
          >
            <Icon className={`w-4 h-4 ${isSelected ? 'animate-bounce' : ''}`} />
            {tab.id}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
