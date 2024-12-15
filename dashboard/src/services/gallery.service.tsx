import { deleteGallery, getGalleries } from '@/actions/gallery';
import { Banner } from '@/entity/Banner';
import { Gallery } from '@/entity/Gallery';
import { useEffect, useState } from 'react';

const getGalleriesService = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getGalleries(limit, offset, keyword, sort);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setGalleries(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [limit, offset, keyword, sort]);

  return { galleries, error, loading, fetch, setLoading, setError, setGalleries };
};

const serviceGalleryDelete = async (gallery: Gallery, setError: (error: string) => void, setLoading: (loading: boolean) => void, cb: () => void) => {
  try {
    setLoading(true);
    await deleteGallery(gallery.id);

    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};

const galleryService = {
  getGalleries: getGalleriesService,
  deleteGallery: serviceGalleryDelete,
};

export default galleryService;
