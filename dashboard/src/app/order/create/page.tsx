'use client';

import DialogErrorComponent from '@/components/DialogError';
import HeaderContentComponent from '@/components/HeaderContent';
import OrderForm from '@/components/order/form';
import { ORDER_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import useNavigateTo from '@/hooks/useNavigateTo';
import { orderSchema } from '@/schema/order';
import orderService from '@/services/order.service';
import { useState } from 'react';
import { z } from 'zod';

export default function CreateOrderPage() {
  const meta = {
    title: 'order',
    resourceName: permission.resources.EMPLOYEE,
    description: 'new order',
  };
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigateTo = useNavigateTo();

  const submit = (values: z.infer<typeof orderSchema>) => {
    orderService.createOrder(
      values,
      (loading) => setLoading(loading),
      (error) => setError(error),
      () => navigateTo(ORDER_URL)
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <HeaderContentComponent title={meta.title} description={meta.description} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <OrderForm submit={submit} order={null} />
      </div>

      <DialogErrorComponent active={error !== ''} onClose={() => setError('')} message={error} />
    </div>
  );
}
