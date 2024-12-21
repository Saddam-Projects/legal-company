import { Cross2Icon } from '@radix-ui/react-icons';
import TextComponent from './Text';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog';

export default function DialogErrorComponent({ active, onClose, message = 'Terjadi kesalahan tidak diketahui', statusCode = 500 }: { active: boolean; onClose: () => void; message?: string; statusCode?: number }) {
  return (
    <Dialog open={active}>
      <DialogContent className="dark:bg-dark bg-light dark:text-white text-dark p-0 shadow-none border-none">
        <DialogHeader className="p-2">
          <div className="flex justify-end">
            <Button onClick={() => onClose()} className="dark:bg-dark bg-light dark:text-white text-dark rounded-xl px-2 py-1 text-teal hover:dark:bg-dark hover:bg-light shadow-none hover:opacity-90">
              <Cross2Icon />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex flex-col space-y-4 justify-center items-center px-4 pb-12">
          <div className="rounded-full p-1 bg-red-500">
            <Cross2Icon className="w-12 h-12" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <TextComponent className="text-2xl font-bold text-teal">{statusCode}</TextComponent>
            <TextComponent className="text-base font-bold text-teal">{message}</TextComponent>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
