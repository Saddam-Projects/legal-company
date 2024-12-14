'use client';
import { getOrdersData } from '@/actions/order';
import { Order } from '@/entity/Order';
import { useEffect, useState } from 'react';

const serviceGetOrdersData = (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    try {
      const response = await getOrdersData(limit, offset, keyword, sort);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setOrders(response);
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    fetch();
  }, [limit, offset, keyword, sort]);

  return {
    orders,
    error,
    loading,
    fetch,
    setLoading,
    setError,
    setOrders,
  };
};

const orderService = {
  getOrders: serviceGetOrdersData,
};

export default orderService;
