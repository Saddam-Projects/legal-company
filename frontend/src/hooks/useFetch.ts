import FetchInterface from '@/interfaces/states/fetchInterface';
import { BASE_API_URL } from '@/utils/constant';
import { useState } from 'react';

export default function useFetch<T>(path: string, baseUrl = BASE_API_URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', header?: Record<string, string>, body?: T, queryParam?: string[]): FetchInterface<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (args?: string[]) => {
    let queryParams = '';

    if (args && args.length > 0) {
      queryParams = `?${args.join('&')}`;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}${path}${queryParams}`, {
        method,
        headers: header,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (method === 'GET') {
    fetchData(queryParam);
  }

  return { isLoading, error, setError, setIsLoading, fetch: fetchData, data, setData };
}
