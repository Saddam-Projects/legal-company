'use client';
import { createOrder, getOrdersData } from '@/actions/order';
import { OrderDto } from '@/dtos/order';
import { Order } from '@/entity/Order';
import errorHandler from '@/lib/errorHandler';
import { orderSchema } from '@/schema/order';
import { useEffect, useState } from 'react';
import { z } from 'zod';

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
      setError(errorHandler(error));
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

const createOrderService = async (order: z.infer<typeof orderSchema>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string>>, cb: () => void) => {
  try {
    setLoading(true);
    const newOrder: OrderDto = {
      name: order.customer_name,
      phone: order.customer_phone,
      email: order.customer_email,
      message: order.message,
      order_items: [order.order_items],
    };
    await createOrder(newOrder);

    cb();
  } catch (error) {
    setError(errorHandler(error));
  } finally {
    setLoading(false);
  }
};

const orderService = {
  getOrders: serviceGetOrdersData,
  createOrder: createOrderService,
};

export default orderService;
