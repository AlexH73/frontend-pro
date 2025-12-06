// Интерфейс статьи от NewsData.io
export interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[] | null;
  description: string;
  content: string | null;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_name: string;
  source_url: string | null;
  source_icon: string | null;
  language: string;
  country: string[];
  category: string[];
  ai_tag: string | null;
  sentiment: string | null;
  sentiment_stats: any;
  ai_region: string | null;
}

// Ответ от NewsData.io API
export interface NewsDataApiResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage: string | null;
}

// Состояние для Redux slice
export interface NewsState {
  articles: NewsDataArticle[];
  favorites: string[]; // article_id's
  viewed: string[]; // article_id's
  category: string;
  sortBy: 'newest' | 'oldest';
  viewMode: 'grid' | 'list';
  showFavorites: boolean;
}

// Категории
export const NEWS_CATEGORIES = [
  'technology',
  'science',
  'business',
  'health',
  'sports',
  'entertainment',
  'politics',
  'environment',
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];
