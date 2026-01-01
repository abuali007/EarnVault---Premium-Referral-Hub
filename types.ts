export enum Category {
  ALL = 'All',
  CRYPTO = 'Crypto',
  EARNING = 'Earning & Surveys',
  AI = 'AI & Tools',
  SHOPPING = 'Services & Shopping',
}

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  category: Category;
  description: string;
  isHot?: boolean; // For highlighting popular items
  code?: string; // Referral code if needed explicitly
}
