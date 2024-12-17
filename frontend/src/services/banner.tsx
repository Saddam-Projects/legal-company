import { getBannerData } from '@/actions/banner.action';
import { Banner } from '@/entity/Banner';
import { useEffect, useState } from 'react';

const getData = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [banners, serBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchData = () => {
    setLoading(true);
    getBannerData(limit, offset, keyword, sort)
      .then((res) => {
        serBanners(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchData(), []);

  return { banners, loading, error, fetchData, serBanners, setLoading, setError };
};

const bannerService = {
  getBanners: getData,
};

export default bannerService;
