import { getBanners } from '@/actions/banner';
import { getServices } from '@/actions/service';
import { Banner } from '@/entity/Banner';
import { Service } from '@/entity/Service';
import { useEffect, useState } from 'react';

const getServicesService = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getServices(limit, offset, keyword, sort);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setServices(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [limit, offset, keyword, sort]);

  return { services, error, loading, fetch, setLoading, setError, setServices };
};

const serviceService = {
  getServices: getServicesService,
};

export default serviceService;
