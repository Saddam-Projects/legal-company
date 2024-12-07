'use client';
import { BASE_API_URL } from '@/utils/constant';

export const getData = async (limit = 10, offset = 0, keyword?: string, sort?: string) => {
  const args = [`limit=${limit}`, `offset=${offset}`];

  if (keyword) {
    args.push(`keyword=${keyword}`);
  }
  if (sort) {
    args.push(`sort=${sort}`);
  }

  let queryParams = '';

  if (args && args.length > 0) {
    queryParams = `?${args.join('&')}`;
  }
  try {
    const response = await fetch(`${BASE_API_URL}${'/service'}${queryParams}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
