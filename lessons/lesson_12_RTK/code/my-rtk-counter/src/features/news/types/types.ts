export interface NewsArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsState {
  articles: NewsArticle[];
  favorites: string[]; // Сохраняем только ID статей
  viewed: string[]; // Просмотренные статьи
  category: string;
  loading: boolean;
  error: string | null;
}

// Функция для преобразования данных API
export const transformNewsArticle = (article: any): NewsArticle => ({
  ...article,
  source: {
    id: article.source?.id || 'unknown',
    name: article.source?.name || 'Unknown Source'
  }
});
