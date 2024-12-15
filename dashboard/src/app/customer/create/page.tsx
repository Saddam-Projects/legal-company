'use client';

import CustomerForm from '@/components/customer/form';
import HeaderContentComponent from '@/components/HeaderContent';
import { CUSTOMER_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import useNavigateTo from '@/hooks/useNavigateTo';
import { customerSchema } from '@/schema/customer';
import customerService from '@/services/customer.service';
import { useState } from 'react';
import { z } from 'zod';

export default function CreateCustomerPage() {
  const meta = {
    title: 'customer',
    resourceName: permission.resources.EMPLOYEE,
    description: 'new customer',
  };
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigateTo = useNavigateTo();

  const submit = (values: z.infer<typeof customerSchema>) => {
    customerService.createCustomer(
      values,
      (loading) => setLoading(loading),
      (error) => setError(error),
      () => navigateTo(CUSTOMER_URL)
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <HeaderContentComponent title={meta.title} description={meta.description} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <CustomerForm submit={submit} customer={null} />
      </div>
    </div>
  );
}
