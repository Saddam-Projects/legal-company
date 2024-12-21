import { getBanners } from '@/actions/banner';
import { deleteClient, getClientLogos } from '@/actions/clientLogo';
import { Banner } from '@/entity/Banner';
import { ClientLogo } from '@/entity/ClientLogo';
import errorHandler from '@/lib/errorHandler';
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
      setError(errorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [limit, offset, keyword, sort]);

  return { clients, error, loading, fetch, setLoading, setError, setClients };
};
const serviceClientDelete = async (client: ClientLogo, setError: (error: string) => void, setLoading: (loading: boolean) => void, cb: () => void) => {
  try {
    setLoading(true);
    await deleteClient(client.id);

    cb();
  } catch (error) {
    setError(errorHandler(error));
  } finally {
    setLoading(false);
  }
};

const clientService = {
  getClients: getClientsService,
  deleteClient: serviceClientDelete,
};

export default clientService;
