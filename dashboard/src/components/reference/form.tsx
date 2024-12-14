'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import permission from '@/datasources/internals/permission';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { referenceSchema } from '@/schema/reference';
import { Reference } from '@/entity/Reference';
import { Textarea } from '../ui/textarea';
import { useEffect } from 'react';

export default function ReferenceForm({ submit, reference }: { submit: (values: z.infer<typeof referenceSchema>) => void; reference: Reference | null }) {
  const form = useForm<z.infer<typeof referenceSchema>>({
    resolver: zodResolver(referenceSchema),
    defaultValues: {
      address: '',
      address_lat: '',
      address_long: '',
      company_email: '',
      company_logo: '',
      company_name: '',
      company_phone: '',
    },
  });

  useEffect(() => {
    if (reference) {
      form.setValue('company_name', reference.company_name);
      form.setValue('company_email', reference.company_email);
      form.setValue('company_phone', reference.company_phone);
      form.setValue('address', reference.address);
      form.setValue('address_lat', reference.address_lat);
      form.setValue('address_long', reference.address_long);
    }
  }, [reference]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <Input placeholder="Company Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Phone</FormLabel>
              <FormControl>
                <Input placeholder="Company Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl>
                <Textarea rows={12} className="resize-none" placeholder="Company Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_lat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address Lat</FormLabel>
              <FormControl>
                <Input placeholder="Address Lat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_long"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address Long</FormLabel>
              <FormControl>
                <Input placeholder="Address Long" {...field} />
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
  );
}
