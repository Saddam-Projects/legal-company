import { createBlog, deleteBlog, getBlog, getBlogs, getImages, updateBlog, uploadImage } from '@/actions/blog';
import { Blog, BlogImage } from '@/entity/Blog';
import errorHandler from '@/lib/errorHandler';
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
      setError(errorHandler(error));
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
      setError(errorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  return { blog, error, loading, fetch, setLoading, setError, setBlog };
};

const deleteBlogService = async (blog: Blog, setError: (error: string) => void, setLoading: (loading: boolean) => void, cb: () => void) => {
  try {
    setLoading(true);
    await deleteBlog(blog.id);

    cb();
  } catch (error) {
    setError(errorHandler(error));
  } finally {
    setLoading(false);
  }
};

const uploadImageService = async (dt: FormData, setError: (error: string) => void, setLoading: (loading: boolean) => void, cb: () => void) => {
  try {
    setLoading(true);
    await uploadImage(dt);
    cb();
  } catch (error) {
    setError(errorHandler(error));
  }
};

const createBlogService = async (blog: FormData, setLoading: (loading: boolean) => void, setError: (error: string) => void, cb: () => void) => {
  try {
    setLoading(true);
    await createBlog(blog);
    cb();
  } catch (error) {
    setError(errorHandler(error));
  } finally {
    setLoading(false);
  }
};

const updateBlogService = async (id: string, blog: FormData, setLoading: (loading: boolean) => void, setError: (error: string) => void, cb: () => void) => {
  try {
    setLoading(true);
    await updateBlog(id, blog);
    cb();
  } catch (error) {
    setError(errorHandler(error));
  } finally {
    setLoading(false);
  }
};

const getBlogImagesService = () => {
  const [images, setImages] = useState<BlogImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getImages();
      if (!response) {
        throw new Error('Failed to fetch data');
      }

      setImages(response);
    } catch (error) {
      setError(errorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { images, error, loading, fetch, setLoading, setError, setImages };
};

const blogService = {
  getBlogs: getBlogsService,
  getBlog: getBlogService,
  deleteBlog: deleteBlogService,
  uploadImage: uploadImageService,
  createBlog: createBlogService,
  updateBlog: updateBlogService,
  getImages: getBlogImagesService,
};

export default blogService;
