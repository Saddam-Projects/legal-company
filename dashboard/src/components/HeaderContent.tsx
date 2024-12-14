import { HeaderContentInterface } from '@/interfaces/components/HeaderContentInterface';
import TextComponent from './Text';

export default function HeaderContentComponent({ title, description }: HeaderContentInterface) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col py-2 space-y-2">
        <TextComponent className="text-3xl font-medium capitalize">{title}</TextComponent>
        {description && <TextComponent className="text-sm font-normal capitalize">{description}</TextComponent>}
      </div>
      <hr className="border-gray-300" />
    </div>
  );
}
