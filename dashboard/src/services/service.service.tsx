import { createService, deleteService, getService, getServices, updateService } from '@/actions/service';
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

const serviceGetServiceData = (id: string) => {
  const [service, setService] = useState<Service | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    try {
      const response = await getService(id);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setService(response);
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  return {
    service,
    error,
    loading,
    fetch,
    setLoading,
    setError,
    setService,
  };
};

const serviceServiceDelete = async (service: Service, setError: (error: string) => void, setLoading: (loading: boolean) => void, cb: () => void) => {
  try {
    setLoading(true);
    await deleteService(service.id);

    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};
const createServiceService = async (service: FormData, setLoading: (loading: boolean) => void, setError: (error: string) => void, cb: () => void) => {
  try {
    setLoading(true);
    await createService(service);

    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};
const updateServiceService = async (id: string, service: FormData, setLoading: (loading: boolean) => void, setError: (error: string) => void, cb: () => void) => {
  try {
    setLoading(true);
    await updateService(id, service);

    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};

const serviceService = {
  getServices: getServicesService,
  getService: serviceGetServiceData,
  deleteService: serviceServiceDelete,
  createService: createServiceService,
  updateService: updateServiceService,
};

export default serviceService;
