'use client';
import DialogErrorComponent from '@/components/DialogError';
import TextComponent from '@/components/Text';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import blogService from '@/services/blog.service';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { cn } from '@/lib/utils';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';
import ImageExt from '@tiptap/extension-image';
import { useEffect } from 'react';

export default function BlogPage() {
  const id = useParams().id;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Paragraph,
      ListItem,
      BulletList,
      ImageExt.configure({
        allowBase64: true,
        inline: true,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: cn(
          'prose max-w-none prose-a:text-blue-500 prose-a:no-underline prose-a:underline-offset-4 [&_ol]:list-decimal [&_ul]:list-disc prose-img:mx-auto prose-img:my-2 prose-img:rounded prose-img:shadow-lg prose-img:object-contain prose-img:object-center [&_ol]:text-light [&_ul]:text-light [&_ol]:pl-5 [&_ul]:pl-5',
          'rounded-md text-sm p-0 border-none min-h-[550px] bg-light border-input focus:ring-offset-2 disabled:cursor-not-allows disabled:opacity-50 p-2'
        ),
      },
    },
    editable: false,
  });
  const blog = blogService.getBlog(id as string);

  useEffect(() => {
    if (blog.blog && editor) {
      editor.commands.setContent(blog.blog.content);
    }
  }, [blog.blog]);

  return (
    <div className="mt-24 container mx-auto px-4 ">
      <DialogErrorComponent active={blog.error !== ''} onClose={() => blog.setError('')} message="Terjadi kesalahan tidak diketahui" />
      {blog.blog && (
        <Card className="bg-white p-0 border-none h-full shadow-none grid grid-cols-1 gap-4">
          <CardHeader className="p-0">
            <div className="w-full h-full">
              <img className="object-cover rounded-lg w-full h-[400px]" src={blog.blog.cover} alt="cover" />
            </div>
          </CardHeader>
          <CardContent onClick={() => {}} className="p-0 border-none bg-white outline-none w-full h-full">
            <TextComponent className="text-xl cursor-pointer font-bold text-black">{blog.blog.title}</TextComponent>
          </CardContent>
          <CardContent className="p-0 border-none bg-white outline-none w-full h-full flex space-x-4">
            <TextComponent className="text-lg font-bold text-gray-400">{blog.blog.author}</TextComponent>
            <TextComponent className="text-lg font-bold text-gray-400">-</TextComponent>
            <TextComponent className="text-lg font-bold text-gray-400">{blog.blog.category.name}</TextComponent>
            <TextComponent className="text-lg font-bold text-gray-400">-</TextComponent>
            <TextComponent className="text-lg font-bold text-gray-400">{moment(blog.blog.created_at).format('DD MMM YYYY')}</TextComponent>
          </CardContent>
          <div className="h-[1px] bg-gray-200 mb-6"></div>
        </Card>
      )}
      {blog.blog && (
        <div>
          <EditorContent contentEditable={false} editor={editor} />
        </div>
      )}
    </div>
  );
}
