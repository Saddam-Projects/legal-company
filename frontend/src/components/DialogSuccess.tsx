import { Cross2Icon } from '@radix-ui/react-icons';
import TextComponent from './Text';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { CheckIcon } from 'lucide-react';

export default function DialogSuccessComponent({ active, onClose, message = 'Berhasil Disimpan', statusCode = 200 }: { active: boolean; onClose: () => void; message?: string; statusCode?: number }) {
  return (
    <Dialog open={active}>
      <DialogContent className="bg-white p-0 shadow-none border-none">
        <DialogHeader>
          <div className="flex justify-end p-2">
            <Button onClick={() => onClose()} className="bg-white rounded-xl px-2 py-1 text-teal hover:bg-white shadow-none hover:opacity-90">
              <Cross2Icon />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex flex-col space-y-4 justify-center items-center px-4 pb-12">
          <div className="rounded-full p-1 bg-green-500">
            <CheckIcon className="w-12 h-12" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <TextComponent className="text-2xl font-bold text-teal">{statusCode}</TextComponent>
            <TextComponent className="text-base text-center font-bold text-teal">{message}</TextComponent>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
