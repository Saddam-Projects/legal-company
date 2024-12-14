import { getClientLogos } from '@/actions/clientLogo';
import { getStatistic } from '@/actions/statistic';
import { Statistic } from '@/entity/Statistic';
import { useEffect, useState } from 'react';

const getStatisticService = () => {
  const [statistic, setStatistic] = useState<Statistic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getStatistic();
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setStatistic(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { statistic, error, loading, fetch, setLoading, setError, setStatistic };
};

const dashboardService = {
  getStatistic: getStatisticService,
};

export default dashboardService;
