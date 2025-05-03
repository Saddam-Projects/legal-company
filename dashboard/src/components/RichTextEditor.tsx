'use client';
import { Editor, EditorContent } from '@tiptap/react';
import ToolBar from './Toolbar';

function Tiptap({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex flex-col justify-stretch min-h-[500px]">
      <ToolBar editor={editor} />
      <div className="w-full">
        <div className="prose prose-2xl max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

export default Tiptap;
