'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ChangeEvent, useEffect, useState } from 'react';
import { BASE_API_URL } from '@/utils/constant';
import { serviceSchema } from '@/schema/service';
import { Service, ServiceTerm } from '@/entity/Service';
import { Label } from '../ui/label';
import { Trash2Icon } from 'lucide-react';

export default function ServiceForm({ submit, service }: { submit: (values: z.infer<typeof serviceSchema>, terms: ServiceTerm[]) => void; service: Service | null }) {
  const [fileName, setFileName] = useState<{
    file: string;
    from: 'BE' | 'FE';
  } | null>(null);
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      description: '',
      name: '',
      price: '',
      file: null,
    },
  });
  const [serviceTerms, setServiceTerms] = useState<ServiceTerm[]>([]);

  const addServiceTerm = () => {
    setServiceTerms([...serviceTerms, { term_name: '', is_deleted: false, id: '' }]);
  };

  const deleteServiceTerm = (index: number) => {
    const deletedTerm = serviceTerms.filter((e) => !e.is_deleted).at(index);

    if (deletedTerm) {
      deletedTerm.is_deleted = true;
      setServiceTerms([...serviceTerms]);
    }
  };

  const onChangeTerm = (index: number, value: string) => {
    const updatedTerms = [...serviceTerms.filter((e) => !e.is_deleted)];
    updatedTerms[index] = { ...updatedTerms[index], term_name: value };
    setServiceTerms(updatedTerms);
  };

  useEffect(() => {
    if (service) {
      form.setValue('name', service.name);
      form.setValue('price', service.price.toString());
      form.setValue('description', service.description);
      form.setValue('file', null);

      setServiceTerms(service.service_terms);

      if (service.image) {
        setFileName({
          file: service.image,
          from: 'BE',
        });
      }
    }
  }, [service]);

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const fileUrl = URL.createObjectURL(file);
      setFileName({
        file: fileUrl,
        from: 'FE',
      });
      form.setValue('file', file);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      {fileName && fileName.file !== 'default.png' && <img src={fileName.from === 'BE' ? `${BASE_API_URL}/${fileName.file}` : fileName.file} className="w-full h-[300px] object-cover" alt="Company Logo" />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            submit(
              values,
              serviceTerms.filter((e) => !e.is_deleted)
            )
          )}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Image</FormLabel>
                <FormControl>
                  <Input onChange={fileHandler} type="file" placeholder="Service Image" />
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
                <FormLabel>Service Name</FormLabel>
                <FormControl>
                  <Input placeholder="Service Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Price</FormLabel>
                <FormControl>
                  <Input type="number" min={0} max={999999999} placeholder="Service Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Description</FormLabel>
                <FormControl>
                  <Textarea rows={12} className="resize-none" placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size={'sm'} className="bg-blue-hris text-white hover:bg-blue-hris hover:opacity-90" type="button" onClick={addServiceTerm}>
            Tambah Term
          </Button>

          <div className="grid grid-cols-1 gap-4">
            {serviceTerms.filter((e) => !e.is_deleted).length > 0 &&
              serviceTerms
                .filter((e) => !e.is_deleted)
                .map((e, i) => (
                  <div key={i} className="flex flex-col space-y-4">
                    <Label htmlFor={`service-terms-${i}`}>{`Service Terms ${i + 1}`}</Label>
                    <div className="flex items-center space-x-2">
                      <Input onChange={(e) => onChangeTerm(i, e.target.value)} value={e.term_name} id={`service-terms-${i}`} placeholder={`Service Terms ${i + 1}`} />
                      <Trash2Icon onClick={() => deleteServiceTerm(i)} size={18} className="dark:text-light text-red-hris cursor-pointer" />
                    </div>
                  </div>
                ))}
          </div>

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
