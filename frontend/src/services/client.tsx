import { getClientData } from '@/actions/client.action';
import { ClientLogo } from '@/entity/ClientLogo';
import { useEffect, useState } from 'react';

const getData = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchData = () => {
    setLoading(true);
    getClientData(limit, offset, keyword, sort)
      .then((res) => {
        setClients(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchData(), []);

  return { clients, loading, error, fetchData, setClients, setLoading, setError };
};

const clientService = {
  getClient: getData,
};

export default clientService;
