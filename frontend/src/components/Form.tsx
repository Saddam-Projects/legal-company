'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GENDER } from '@/entity/enum';
import ButtonActionComponent from './ButtonAction';
import permission from '@/datasources/internals/permission';
import SelectInput from './SelectInput';

export default function FormComponent() {
  const meta = {
    title: 'create employee',
    description: 'create new employee',
    resourceName: permission.resources.EMPLOYEE,
  };
  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'name must be at least 2 characters.',
    }),
    workingMail: z.string().email(),
    workingPhone: z.string().max(13).regex(/^\d/, 'Phone number must be digits'),
    gender: z.string(),
    company: z.string(),
    department: z.string(),
    position: z.string(),
    reportTo: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      workingMail: '',
      workingPhone: '',
      gender: '',
      company: '',
      department: '',
      position: '',
      reportTo: '',
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workingMail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Working Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workingPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Working Phonenumber</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="border-1 dark:border-white border-dark">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={GENDER.MALE}>{GENDER.MALE.toLowerCase()}</SelectItem>
                    <SelectItem value={GENDER.FEMALE}>{GENDER.FEMALE.toLowerCase()}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <SelectInput />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <SelectInput />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <SelectInput />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reportTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report To</FormLabel>
              <FormControl>
                <SelectInput />
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
