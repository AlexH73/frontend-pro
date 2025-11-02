import { useState, useCallback } from 'react';
import type { ApiConfig, ApiError, ApiState, RequestOptions } from './types/types';


// Основной хук
export function useApi<T = any>(config: ApiConfig = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Функция для создания полного URL
  const createUrl = useCallback(
    (url: string): string => {
      if (config.baseURL && !url.startsWith('http')) {
        return `${config.baseURL}${url.startsWith('/') ? url : `/${url}`}`;
      }
      return url;
    },
    [config.baseURL]
  );

  // Базовая функция запроса
  const request = useCallback(
    async <R = T>(url: string, options: RequestInit = {}): Promise<R> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const fullUrl = createUrl(url);

        const response = await fetch(fullUrl, {
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          const errorData = await response.text().then((text) => {
            try {
              return JSON.parse(text);
            } catch {
              return text || response.statusText;
            }
          });

          throw {
            message: `HTTP Error ${response.status}`,
            status: response.status,
            data: errorData,
          };
        }

        // Для DELETE запросов может не быть тела
        if (options.method === 'DELETE' && response.status === 204) {
          return null as R;
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const apiError: ApiError = {
          message:
            error instanceof Error ? error.message : 'Unknown error occurred',
          status: (error as ApiError).status,
          data: (error as ApiError).data,
        };

        setState((prev) => ({ ...prev, loading: false, error: apiError }));
        throw apiError;
      }
    },
    [config.headers, createUrl]
  );

  // GET запрос
  const get = useCallback(
    <R = T>(url: string, options: RequestOptions = {}): Promise<R> => {
      return request<R>(url, {
        method: 'GET',
        ...options,
      });
    },
    [request]
  );

  // POST запрос
  const post = useCallback(
    <R = T>(
      url: string,
      body?: any,
      options: RequestOptions = {}
    ): Promise<R> => {
      return request<R>(url, {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      });
    },
    [request]
  );

  // PUT запрос
  const put = useCallback(
    <R = T>(
      url: string,
      body?: any,
      options: RequestOptions = {}
    ): Promise<R> => {
      return request<R>(url, {
        method: 'PUT',
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      });
    },
    [request]
  );

  // PATCH запрос
  const patch = useCallback(
    <R = T>(
      url: string,
      body?: any,
      options: RequestOptions = {}
    ): Promise<R> => {
      return request<R>(url, {
        method: 'PATCH',
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      });
    },
    [request]
  );

  // DELETE запрос
  const del = useCallback(
    <R = T>(url: string, options: RequestOptions = {}): Promise<R> => {
      return request<R>(url, {
        method: 'DELETE',
        ...options,
      });
    },
    [request]
  );

  // Сброс состояния
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    // Состояние
    data: state.data,
    loading: state.loading,
    error: state.error,

    // Методы
    get,
    post,
    put,
    patch,
    delete: del,
    request,

    // Утилиты
    reset,
  };
}

// Создание предконфигурированного хука для конкретного API
export function createApiHook(
  baseURL: string,
  headers: Record<string, string> = {}
) {
  return <T = any>() => useApi<T>({ baseURL, headers });
}
