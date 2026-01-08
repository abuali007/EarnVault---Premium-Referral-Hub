// Changing Enum to const object for better runtime safety in browser environments
export const Category = {
  ALL: 'All',
  CRYPTO: 'Crypto',
  EARNING: 'Earning & Surveys',
  AI: 'AI & Tools',
  SHOPPING: 'Services & Shopping',
} as const;

export type Category = typeof Category[keyof typeof Category];

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  category: Category;
  description: string;
  isHot?: boolean; // For highlighting popular items
  code?: string; // Referral code if needed explicitly
}