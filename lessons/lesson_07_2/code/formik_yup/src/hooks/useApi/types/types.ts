// Типы для хука
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export interface ApiConfig {
  baseURL?: string;
  headers?: Record<string, string>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}
