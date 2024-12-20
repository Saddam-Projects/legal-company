'use client';
import { createOrder } from '@/actions/order';
import { OrderDto } from '@/dtos/order';
import serviceFormSchema from '@/dtos/service';
import { z } from 'zod';

const createOrderService = async (order: z.infer<typeof serviceFormSchema>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string>>, cb: () => void) => {
  try {
    setLoading(true);
    const newOrder: OrderDto = {
      name: order.name,
      phone: order.phone,
      email: order.email,
      message: order.message,
      order_items: [order.service],
    };
    await createOrder(newOrder);

    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};

const orderService = {
  createOrder: createOrderService,
};

export default orderService;
