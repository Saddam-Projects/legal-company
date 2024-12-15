'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useEffect } from 'react';
import { orderSchema } from '@/schema/order';
import { Order } from '@/entity/Order';
import ServiceDropdownComponent from '../serviceDropdown';

export default function OrderForm({ submit, order }: { submit: (values: z.infer<typeof orderSchema>) => void; order: Order | null }) {
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer_email: '',
      customer_name: '',
      customer_phone: '',
      message: '',
      order_items: '',
    },
  });

  useEffect(() => {
    if (order) {
      form.setValue('customer_email', order.customer.email);
      form.setValue('customer_name', order.customer.name);
      form.setValue('customer_phone', order.customer.phone);
      form.setValue('message', order.message ?? '');
      form.setValue('order_items', order.order_items[0].id);
    }
  }, [order]);

  return (
    <div className="flex flex-col space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Customer Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Customer Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email</FormLabel>
                <FormControl>
                  <Input placeholder="Customer Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea rows={12} className="resize-none" placeholder="Company Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order_items"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pilih Layanan</FormLabel>
                <FormControl>
                  <ServiceDropdownComponent field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button size={'sm'} className="bg-blue-hris text-white hover:bg-blue-hris hover:opacity-90" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
