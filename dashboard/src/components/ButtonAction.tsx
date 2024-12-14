import { DeleteIcon, EyeIcon, FilterIcon, PenIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import ButtonActionInterface from '@/interfaces/components/ButtonActionInterface';
import TextComponent from './Text';

const ButtonCreate = ({ currentResource, onClick }: ButtonActionInterface) => {
  return (
    <Button onClick={(e) => onClick(e)} size={'sm'} className="rounded-lg bg-blue-hris text-white hover:bg-blue-hris hover:opacity-90">
      <div className="flex space-x-2">
        <PlusIcon />
        <TextComponent className="text-white text-small">New</TextComponent>
      </div>
    </Button>
  );
};
const ButtonUpdate = ({ currentResource, onClick }: ButtonActionInterface) => {
  return (
    <Button onClick={(e) => onClick(e)} size={'sm'} className="px-2 py-4 rounded-lg border-1 dark:border-blue-hris dark:bg-transparent dark:text-white bg-light text-dark hover:opacity-80 hover:bg-transparent">
      <div className="flex space-x-2">
        <PenIcon className="dark:text-light" />
      </div>
    </Button>
  );
};

const ButtonDetail = ({ currentResource, onClick }: ButtonActionInterface) => {
  return (
    <Button onClick={(e) => onClick(e)} size={'sm'} className="px-2 py-4 rounded-lg border-1 dark:border-blue-hris dark:bg-transparent dark:text-white bg-light text-dark hover:opacity-80 hover:bg-transparent">
      <div className="flex space-x-2">
        <EyeIcon className="dark:text-light" />
      </div>
    </Button>
  );
};

const ButtonDelete = ({ currentResource, onClick }: ButtonActionInterface) => {
  return (
    <Button onClick={(e) => onClick(e)} size={'sm'} className="px-2 py-4 rounded-lg border-1 dark:border-yellow dark:bg-transparent dark:text-white bg-light text-dark hover:opacity-80 hover:bg-transparent">
      <div className="flex space-x-2">
        <Trash2Icon className="text-ligth" />
      </div>
    </Button>
  );
};

const ButtonFilter = ({ currentResource, onClick }: ButtonActionInterface) => {
  return (
    <Button onClick={(e) => onClick(e)} size={'sm'} className="bg-transparent border-1 border-gray-300 hover:bg-transparent hover:opacity-90">
      <div className="flex space-x-2">
        <FilterIcon className="dark:text-white text-black" />
        <TextComponent className="text-small dark:text-white text-black">Filters</TextComponent>
      </div>
    </Button>
  );
};

export default function ButtonActionComponent({ currentResource, onClick, buttonType }: ButtonActionInterface) {
  const buttons = {
    ADD: ButtonCreate,
    UPDATE: ButtonUpdate,
    FILTER: ButtonFilter,
    DELETE: ButtonDelete,
    VIEW_DETAIL: ButtonDetail,
  };

  const CurrentButton = buttons[buttonType as keyof typeof buttons];

  return <CurrentButton buttonType={buttonType} currentResource={currentResource} onClick={onClick} />;
}
