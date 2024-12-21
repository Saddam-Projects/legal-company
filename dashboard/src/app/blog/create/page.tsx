'use client';

import RichTextEditorComponent from '@/components/RichTextEditor';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { blogSchema } from '@/schema/blog';
import CategoryDropdownComponent from '@/components/categoryDropdown';

export default function Blog() {
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      image: '',
      file: null,
      category: '',
      author: '',
    },
  });

  const onChangeHandler = (text: string) => {
    console.log(text);
  };
  const submit = (values: z.infer<typeof blogSchema>) => {};

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Artikel</FormLabel>
                <FormControl>
                  <Input placeholder="Judul Artikel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pilih Kategori</FormLabel>
                <FormControl>
                  <CategoryDropdownComponent field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <RichTextEditorComponent description="content" onChange={onChangeHandler} />

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
