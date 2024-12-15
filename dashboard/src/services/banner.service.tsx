import { deleteBanner, getBanners } from '@/actions/banner';
import { Banner } from '@/entity/Banner';
import { useEffect, useState } from 'react';

const getBannersService = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getBanners(limit, offset, keyword, sort);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setBanners(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [limit, offset, keyword, sort]);

  return { banners, error, loading, fetch, setLoading, setError, setBanners };
};

const serviceBannerDelete = async (banner: Banner, setError: (error: string) => void, setLoading: (loading: boolean) => void, cb: () => void) => {
  try {
    setLoading(true);
    await deleteBanner(banner.id);

    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};

const bannerService = {
  getBanners: getBannersService,
  deleteBanner: serviceBannerDelete,
};

export default bannerService;
