'use client';
import React from 'react';
import { type Editor } from '@tiptap/react';
import { Toggle } from './ui/toggle';
import { Bold, Heading5, Heading6, Heading1, Heading3, Heading4, Heading2, Italic, List, ListOrdered, StrikethroughIcon, Image } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Level } from '@tiptap/extension-heading';
import TextComponent from './Text';
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';

type Props = {
  editor: Editor | null;
};

function ToolBar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-3 border bg-light text-dark border-input rounded-lg py-1 px-3 my-2">
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenuTrigger>{editor.isActive('heading') ? `H${editor.getAttributes('heading').level}` : 'H'}</DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <TextComponent className="text-base p-2 dark:bg-dark bg-light dark:text-white text-dark">heading</TextComponent>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Toggle
              key={index}
              className="w-full"
              size="sm"
              pressed={editor.isActive('haeding', { level: item })}
              onPressedChange={() =>
                editor
                  .chain()
                  .focus()
                  .setHeading({ level: item as Level })
                  .run()
              }
            >
              <TextComponent className={`text-base font-regular capitalize ${editor.isActive('heading', { level: item }) ? 'font-bold' : 'font-medium'}`}>H{item}</TextComponent>
            </Toggle>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
              <Bold className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <TextComponent className="text-base p-2 dark:bg-dark bg-light dark:text-white text-dark">bold</TextComponent>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Toggle size="sm" pressed={editor.isActive('paragraph')} onPressedChange={() => editor.chain().focus().setParagraph().run()}>
              <TextComponent className={` ${editor.isActive('paragraph') ? 'text-dark dark:text-light hover:text-dark hover:dark:text-light' : 'text-dark  hover:text-dark  '}`}>P</TextComponent>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <TextComponent className="text-base p-2 dark:bg-dark bg-light dark:text-white text-dark">paragraph</TextComponent>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
              <Italic className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <TextComponent className="text-base p-2 dark:bg-dark bg-light dark:text-white text-dark">italic</TextComponent>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
              <StrikethroughIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <TextComponent className="text-base p-2 dark:bg-dark bg-light dark:text-white text-dark">strike through</TextComponent>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
              <List className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <TextComponent className="text-base p-2 dark:bg-dark bg-light dark:text-white text-dark">list</TextComponent>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
              <ListOrdered className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <TextComponent className="text-base p-2 dark:bg-dark bg-light dark:text-white text-dark">list number</TextComponent>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default ToolBar;
