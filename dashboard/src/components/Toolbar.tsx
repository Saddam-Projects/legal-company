'use client';
import React, { useRef, useState } from 'react';
import { type Editor } from '@tiptap/react';
import { Toggle } from './ui/toggle';
import { Bold, Italic, List, ListOrdered, StrikethroughIcon, ImageIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Level } from '@tiptap/extension-heading';
import TextComponent from './Text';
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import blogService from '@/services/blog.service';
import { BASE_API_URL } from '@/utils/constant';
import DialogErrorComponent from './DialogError';

type Props = {
  editor: Editor | null;
};

function ToolBar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  const ref = useRef<HTMLInputElement>(null);
  const [modalUploadImage, setModalUploadImage] = useState(false);
  const serviceImages = blogService.getImages();

  const addImage = () => {
    ref.current!.click();
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const data = new FormData();

      data.append('file', file);

      blogService.uploadImage(data, serviceImages.setError, serviceImages.setLoading, () => serviceImages.fetch());
    }
  };

  const selectImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
    setModalUploadImage(false);
  };

  return (
    <div className="grid grid-cols-4 lg:grid-cols-12 gap-2 border bg-light text-dark border-input rounded-lg py-1 px-3 my-2">
      <Input onChange={onChangeImage} ref={ref} className="hidden" type="file" />
      <Dialog open={modalUploadImage}>
        <DialogContent className="dark:bg-dark bg-light dark:text-white text-dark p-0 shadow-none border-none">
          <DialogHeader className="p-2">
            <div className="flex justify-end">
              <Button onClick={() => setModalUploadImage(false)} className="dark:bg-dark bg-light dark:text-white text-dark rounded-xl px-2 py-1 text-teal hover:dark:bg-dark hover:bg-light shadow-none hover:opacity-90">
                <Cross2Icon />
              </Button>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {serviceImages.images.map((item, index) => (
              <div key={index} onClick={() => selectImage(`${BASE_API_URL}/${item.url}`)} className="rounded-lg cursor-pointer items-center flex justify-center p-2 border-1 border-gray-400">
                <img className="w-full h-full object-contain" alt="image" src={`${BASE_API_URL}/${item.url}`} />
              </div>
            ))}
            <div onClick={addImage} className="rounded-lg items-center flex justify-center p-2 border-1 border-gray-400">
              <PlusIcon className="w-16 h-16" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
            <Toggle size="sm" pressed={false} onPressedChange={() => setModalUploadImage(true)}>
              <ImageIcon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <TextComponent className="text-base p-2 dark:bg-dark bg-light dark:text-white text-dark">image</TextComponent>
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

      <DialogErrorComponent active={serviceImages.error !== ''} onClose={() => serviceImages.setError('')} message={serviceImages.error} />
    </div>
  );
}

export default ToolBar;
