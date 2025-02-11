'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import contactSchema from '@/dtos/contact';

export default function FormComponent({ handler }: { handler: (values: z.infer<typeof contactSchema>) => void }) {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          handler(values);
          form.reset();
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="name" {...field} className=" text-black border-gray-200 border-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Email</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="email" {...field} className=" text-black border-gray-200 border-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">phone</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="phone" {...field} className=" text-black border-gray-200 border-1" />
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
              <FormLabel className="text-black">Message</FormLabel>
              <FormControl>
                <Textarea autoComplete="off" rows={6} placeholder="message" {...field} className=" text-black border-gray-200 border-1 resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button size={'sm'} className="bg-primary text-black hover:bg-primary hover:opacity-90" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
