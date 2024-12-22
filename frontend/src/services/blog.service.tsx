import { getBlogs, getBlog } from '@/actions/blog';
import { Blog, BlogImage } from '@/entity/Blog';
import { useEffect, useState } from 'react';

const getBlogsService = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getBlogs(limit, offset, keyword, sort);
      if (!response) {
        throw new Error('Failed to fetch data');
      }

      setBlogs(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [limit, offset, keyword, sort]);

  return { blogs, error, loading, fetch, setLoading, setError, setBlogs };
};

const getBlogService = (id: string) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getBlog(id);
      if (!response) {
        throw new Error('Failed to fetch data');
      }

      setBlog(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  return { blog, error, loading, fetch, setLoading, setError, setBlog };
};

const blogService = {
  getBlogs: getBlogsService,
  getBlog: getBlogService,
};

export default blogService;
