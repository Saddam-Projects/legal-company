import serviceActions from '@/actions/service.action';
import { Service } from '@/entity/service';
import { useEffect, useState } from 'react';

const getData = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchData = () => {
    setLoading(true);
    serviceActions
      .getData(limit, offset, keyword, sort)
      .then((res) => {
        setServices(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchData(), []);

  return { services, loading, error, fetchData, setServices, setLoading, setError };
};

const serviceService = {
  getData,
};

export default serviceService;
