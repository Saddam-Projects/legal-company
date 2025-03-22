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
import { useEffect, useMemo } from 'react';
import { BASE_API_URL } from '@/utils/constant';
import { validate } from 'uuid';
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

export default function BlogComponent() {
  const id = useParams().id;

  const isUuid = useMemo(() => validate(id), [id]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Paragraph,
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      ImageExt.configure({
        allowBase64: true,
        inline: true,
      }),
      Bold,
      Blockquote,
      HorizontalRule,
      Strike,
      Text,
      CodeBlock.configure({
        defaultLanguage: 'plaintext',
      }),
      HardBreak,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) => (typeof p === 'string' ? p : p.scheme));

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      OrderedList,
      Italic,
      Underline,
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full',
        },
      }),
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TextStyle.configure({
        HTMLAttributes: {
          class: 'text-dark',
        },
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

  const blog = blogService.getBlog(id as string, isUuid);

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
              <img className="object-cover rounded-lg w-full h-[400px]" src={`${BASE_API_URL}/${blog.blog.cover}`} alt="cover" />
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
