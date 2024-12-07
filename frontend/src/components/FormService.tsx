'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GENDER } from '@/entity/enum';
import serviceService from '@/services/service';

export default function FormServiceComponent() {
  const service = serviceService.getData(undefined, 0, undefined, 'new');
  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'name must be at least 2 characters.',
    }),
    email: z.string().email(),
    phone: z.string().max(13).regex(/^\d/, 'Phone number must be digits'),
    message: z.string(),
    service: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      service: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Name</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="text-black hover:bg-white border-1 border-gray-200">
                    <SelectValue className="text-black" placeholder="Pilih Layanan" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-none overflow-y-auto">
                    {service.services.map((e, index) => (
                      <SelectItem key={index} className="bg-white text-black hover:bg-white focus:bg-white hover:text-black focus:text-black cursor-pointer text-base capitalize" value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className=" text-black border-gray-200 border-1" />
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
                <Input placeholder="shadcn" {...field} className=" text-black border-gray-200 border-1" />
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
                <Input placeholder="shadcn" {...field} className=" text-black border-gray-200 border-1" />
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
                <Textarea rows={6} placeholder="shadcn" {...field} className=" text-black border-gray-200 border-1 resize-none" />
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
