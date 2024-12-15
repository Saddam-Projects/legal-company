import { Cross2Icon, QuestionMarkIcon } from '@radix-ui/react-icons';
import TextComponent from './Text';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from './ui/dialog';

export default function ModalConfirmationComponent({ open, cancel, submit }: { open: boolean; cancel: () => void; submit: () => void }) {
  return (
    <Dialog open={open}>
      <DialogContent className="z-50">
        <DialogHeader className="p-2"></DialogHeader>
        <div className="flex flex-col space-y-4 justify-center items-center px-4 pb-12">
          <QuestionMarkIcon className="w-12 h-12 dark:text-light text-dark" />
          <div className="flex flex-col justify-center items-center space-y-4">
            <TextComponent className="text-2xl font-bold text-teal">Are you sure to continue?</TextComponent>
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-center lg:justify-end space-x-4">
            <Button size={'sm'} className="bg-red-hris text-white hover:bg-red-hris hover:opacity-90" onClick={cancel}>
              Cancel
            </Button>
            <Button size={'sm'} className="bg-blue-hris text-white hover:bg-blue-hris hover:opacity-90" onClick={submit}>
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
