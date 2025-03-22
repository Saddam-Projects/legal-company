'use client';

import RichTextEditorComponent from '@/components/RichTextEditor';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogSchema } from '@/schema/blog';
import { ChangeEvent, useState } from 'react';
import { BASE_API_URL } from '@/utils/constant';
import blogService from '@/services/blog.service';
import useNavigateTo from '@/hooks/useNavigateTo';
import { BLOG_URL } from '@/datasources/internals/menus';
import DialogErrorComponent from '@/components/DialogError';
import { Textarea } from '@/components/ui/textarea';
import { useEditorProvider } from '@/hooks/useEditor';

export default function Blog() {
  const [fileName, setFileName] = useState<{
    file: string;
    from: 'BE' | 'FE';
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: 'content',
      image: '',
      file: null,
      category: '',
      author: '',
    },
  });

  const navigateTo = useNavigateTo();
  const editor = useEditorProvider({
    content: '',
    onUpdate: (content) => {
      form.setValue('content', content);
    },
  });

  const submit = (values: z.infer<typeof blogSchema>) => {
    const data = new FormData();

    data.append('title', values.title);
    data.append('author', values.author);
    data.append('category', values.category);
    data.append('content', values.content);

    if (values.description) data.append('description', values.description);
    if (values.keywords) data.append('keywords', values.keywords);

    data.append('slug', values.slug);

    if (values.file) data.append('file', values.file);

    blogService.createBlog(
      data,
      (loading) => setLoading(loading),
      (error) => setError(error),
      () => navigateTo(BLOG_URL)
    );
  };

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
                <FormLabel>Kategori Artikel</FormLabel>
                <FormControl>
                  <Input placeholder="law" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fileName && <img src={fileName.from === 'BE' ? `${BASE_API_URL}/${fileName.file}` : fileName.file} className="w-full h-[300px] object-cover" alt="Company Logo" />}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Artikel</FormLabel>
                <FormControl>
                  <Input onChange={fileHandler} type="file" placeholder="Company Logo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Url</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Custom Url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keyword</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Keyword" />
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
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={6} placeholder="Meta Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button size={'sm'} className="bg-blue-hris text-white hover:bg-blue-hris hover:opacity-90" type="submit">
              Publish
            </Button>
          </div>
        </form>
      </Form>
      <div className="my-4">
        <RichTextEditorComponent editor={editor} />
      </div>

      <DialogErrorComponent active={error !== ''} onClose={() => setError('')} message={error} />
    </div>
  );
}
