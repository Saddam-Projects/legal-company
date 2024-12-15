'use client';
import { createCustomer, deleteCustomer, getCustomerData, getCustomersData, updateCustomer } from '@/actions/customer';
import { CustomerDto } from '@/dtos/customer';
import { Customer } from '@/entity/Customer';
import { customerSchema } from '@/schema/customer';
import { useEffect, useState } from 'react';
import { z } from 'zod';

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

const serviceCustomerDelete = async (customer: Customer, setError: (error: string) => void, setLoading: (loading: boolean) => void, cb: () => void) => {
  try {
    setLoading(true);
    await deleteCustomer(customer.id);

    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};
const serviceGetCustomerData = (id?: string) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    try {
      const response = await getCustomerData(id || '');
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      setCustomer(response);
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  return {
    customer,
    error,
    loading,
    fetch,
    setLoading,
    setError,
    setCustomer,
  };
};

const createCustomerService = async (customer: z.infer<typeof customerSchema>, setLoading: (loading: boolean) => void, setError: (error: string) => void, cb: () => void) => {
  try {
    const newCustomer: CustomerDto = {
      email: customer.customer_email,
      name: customer.customer_name,
      phone: customer.customer_phone,
    };

    setLoading(true);
    await createCustomer(newCustomer);
    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};

const updateCustomerService = async (id: string, customer: z.infer<typeof customerSchema>, setLoading: (loading: boolean) => void, setError: (error: string) => void, cb: () => void) => {
  try {
    const newCustomer: CustomerDto = {
      email: customer.customer_email,
      name: customer.customer_name,
      phone: customer.customer_phone,
    };

    setLoading(true);
    await updateCustomer(newCustomer, id);
    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};

const customerService = {
  getCustomers: serviceGetCustomersData,
  deleteCustomer: serviceCustomerDelete,
  getCustomer: serviceGetCustomerData,
  createCustomer: createCustomerService,
  updateCustomer: updateCustomerService,
};

export default customerService;
