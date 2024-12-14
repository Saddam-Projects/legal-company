import { getReference } from '@/actions/reference';
import { Reference } from '@/entity/Reference';
import { useEffect, useState } from 'react';

const getReferenceData = () => {
  const [reference, setReference] = useState<Reference | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetch = async () => {
    try {
      const response = await getReference();
      if (!response) {
        throw new Error('Failed to fetch data');
      }

      setReference(response[0]);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { reference, error, loading, fetch, setLoading, setError, setReference };
};

const referenceService = {
  getReference: getReferenceData,
};

export default referenceService;
