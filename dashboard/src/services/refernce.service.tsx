import { getReference, updateReference } from '@/actions/reference';
import { ReferenceDto } from '@/dtos/reference';
import { Reference } from '@/entity/Reference';
import errorHandler from '@/lib/errorHandler';
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
      setError(errorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { reference, error, loading, fetch, setLoading, setError, setReference };
};

const updateReferenceData = async (id: string, formData: FormData, setLoading: (loading: boolean) => void, setError: (error: string) => void, cb: () => void) => {
  try {
    await updateReference(id, formData);

    cb();
  } catch (error) {
    setError(errorHandler(error));
  } finally {
    setLoading(false);
  }
};

const referenceService = {
  getReference: getReferenceData,
  updateReference: updateReferenceData,
};

export default referenceService;
