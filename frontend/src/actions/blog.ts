import { BLOG_PATH, BLOG_SLUG_PATH } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';

export const getBlogs = async (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const args = [];

  if (keyword) {
    args.push(`keyword=${keyword}`);
  }
  if (sort) {
    args.push(`sort=${sort}`);
  }

  if (limit) {
    args.push(`limit=${limit}`);
  }

  if (offset) {
    args.push(`offset=${offset}`);
  }

  let queryParams = '';

  if (args && args.length > 0) {
    queryParams = `?${args.join('&')}`;
  }

  try {
    const response = await fetch(`${BASE_API_URL}${BLOG_PATH}${queryParams}`, {
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

export const getBlog = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}${BLOG_PATH}/${id}`, {
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
export const getBlogBySlug = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}${BLOG_SLUG_PATH}/${id}`, {
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
