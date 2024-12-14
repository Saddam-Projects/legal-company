'use client';
import { getCustomersData } from '@/actions/customer';
import { Customer } from '@/entity/Customer';
import { useEffect, useState } from 'react';

const serviceGetCustomersData = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    try {
      const response = await getCustomersData(limit, offset, keyword, sort);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setCustomers(response);
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    fetch();
  }, [limit, offset, keyword, sort]);

  return {
    customers,
    error,
    loading,
    fetch,
    setLoading,
    setError,
    setCustomers,
  };
};

const customerService = {
  getCustomers: serviceGetCustomersData,
};

export default customerService;
