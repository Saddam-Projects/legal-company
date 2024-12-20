'use server';

import { OrderDto } from '@/dtos/order';
import { ORDER_PATH } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';

export const createOrder = async (order: OrderDto) => {
  try {
    const response = await fetch(`${BASE_API_URL}${ORDER_PATH}`, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
