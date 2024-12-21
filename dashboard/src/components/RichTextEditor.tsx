'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import ToolBar from './Toolbar';
import { cn } from '@/lib/utils';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';

function Tiptap({ description, onChange, className }: { className?: string; description: string; onChange: (richText: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Paragraph,
      ListItem,
      BulletList,
    ],
    content: description,
    editorProps: {
      attributes: {
        class: cn(
          'prose max-w-none prose-a:text-blue-500 prose-a:no-underline prose-a:underline-offset-4 [&_ol]:list-decimal [&_ul]:list-disc prose-img:mx-auto prose-img:my-2 prose-img:rounded prose-img:shadow-lg prose-img:object-contain prose-img:object-center [&_ol]:text-light [&_ul]:text-light [&_ol]:pl-5 [&_ul]:pl-5',
          'rounded-md text-sm p-0 border min-h-[550px] bg-light border-input focus:ring-offset-2 disabled:cursor-not-allows disabled:opacity-50 p-2',
          className
        ),
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default Tiptap;
