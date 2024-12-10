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

const getService = (id: string) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchData = () => {
    setLoading(true);
    serviceActions
      .getService(id)
      .then((res) => {
        setService(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchData(), [id]);

  return { service, loading, error, fetchData, setService, setLoading, setError };
};

const serviceService = {
  getData,
  getService,
};

export default serviceService;
