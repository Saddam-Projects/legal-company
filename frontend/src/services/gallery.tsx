import { getGalleryData } from '@/actions/gallery.action';
import { Gallery } from '@/entity/Gallery';
import { useEffect, useState } from 'react';

const getData = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [galleries, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchData = () => {
    setLoading(true);
    getGalleryData(limit, offset, keyword, sort)
      .then((res) => {
        setGallery(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchData(), []);

  return { galleries, loading, error, fetchData, setGallery, setLoading, setError };
};

const galleryService = {
  getGalleries: getData,
};

export default galleryService;
