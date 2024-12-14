import { getBanners } from '@/actions/banner';
import { getClientLogos } from '@/actions/clientLogo';
import { Banner } from '@/entity/Banner';
import { ClientLogo } from '@/entity/ClientLogo';
import { useEffect, useState } from 'react';

const getClientsService = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getClientLogos(limit, offset, keyword, sort);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setClients(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [limit, offset, keyword, sort]);

  return { clients, error, loading, fetch, setLoading, setError, setClients };
};

const clientService = {
  getClients: getClientsService,
};

export default clientService;
