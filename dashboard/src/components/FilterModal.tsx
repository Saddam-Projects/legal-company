import { XIcon } from 'lucide-react';
import { Button } from './ui/button';
import FilterModalInterface from '@/interfaces/components/FilterModalInterface';

export default function FilterModalComponent({ setIsActive }: FilterModalInterface) {
  return (
    <div className="absolute border-1 border-l-gray-300 bottom-0 p-4 right-0 w-1/2 lg:w-1/4 h-full dark:bg-content-dark bg-content-light">
      <div className="flex ">
        <div className="ml-auto">
          <XIcon onClick={() => setIsActive(false)} className="cursor-pointer" />
        </div>
      </div>
      <div className="flex py-4 h-full overflow-y-auto items-end justify-end">
        <div className="flex space-x-2">
          <Button size={'sm'} className="bg-red-hris text-white hover:bg-red-hris hover:opacity-90" onClick={() => setIsActive(false)}>
            Cancel
          </Button>
          <Button size={'sm'} className="bg-blue-hris text-white  hover:bg-blue-hris hover:opacity-90">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
