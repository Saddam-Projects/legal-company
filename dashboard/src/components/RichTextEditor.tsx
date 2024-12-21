'use client';
import { Editor, EditorContent } from '@tiptap/react';
import ToolBar from './Toolbar';

function Tiptap({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default Tiptap;
