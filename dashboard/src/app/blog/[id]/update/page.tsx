'use client';

import RichTextEditorComponent from '@/components/RichTextEditor';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogSchema } from '@/schema/blog';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { cn } from '@/lib/utils';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';
import ImageExt from '@tiptap/extension-image';
import { ChangeEvent, useEffect, useState } from 'react';
import { BASE_API_URL } from '@/utils/constant';
import useNavigateTo from '@/hooks/useNavigateTo';
import { useParams } from 'next/navigation';
import { BLOG_URL } from '@/datasources/internals/menus';
import blogService from '@/services/blog.service';
import { Textarea } from '@/components/ui/textarea';

import Bold from '@tiptap/extension-bold';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import HardBreak from '@tiptap/extension-hard-break';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import Italic from '@tiptap/extension-italic';
import Youtube from '@tiptap/extension-youtube';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';
import { useEditorProvider } from '@/hooks/useEditor';

export default function Blog() {
  const id = useParams().id;
  const navigate = useNavigateTo();

  const serviceBlog = blogService.getBlog(id as string);

  useEffect(() => {
    if (!id) {
      navigate(BLOG_URL);
      return;
    }
  }, [id]);

  const [fileName, setFileName] = useState<{
    file: string;
    from: 'BE' | 'FE';
  } | null>(null);

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

  const editor = useEditorProvider({
    content: '',
    onUpdate: (content) => {
      form.setValue('content', content);
    },
  });
  useEffect(() => {
    if (serviceBlog.blog) {
      form.setValue('title', serviceBlog.blog.title);
      if (serviceBlog.blog.cover) {
        setFileName({
          file: serviceBlog.blog.cover,
          from: 'BE',
        });
      }
      if (serviceBlog.blog.author) {
        form.setValue('author', serviceBlog.blog.author);
      }
      form.setValue('category', serviceBlog.blog.category.name);
      form.setValue('slug', serviceBlog.blog.slug);

      if (serviceBlog.blog.description) {
        form.setValue('description', serviceBlog.blog.description);
      }

      if (serviceBlog.blog.keywords) {
        form.setValue('keywords', serviceBlog.blog.keywords);
      }

      if (serviceBlog.blog.content && editor) {
        form.setValue('content', serviceBlog.blog.content);
        editor.chain().focus().setContent(serviceBlog.blog.content).run();
      }
    }
  }, [serviceBlog.blog, editor]);

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

    blogService.updateBlog(
      id as string,
      data,
      (loading) => serviceBlog.setLoading(loading),
      (error) => serviceBlog.setError(error),
      () => {
        serviceBlog.fetch();
        navigate(BLOG_URL);
      }
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
    </div>
  );
}
