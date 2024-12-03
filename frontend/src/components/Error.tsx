import ErrorComponentInterface from '@/interfaces/components/ErrorInterface';
import Image from 'next/image';
import TextComponent from './Text';

export default function ErrorComponent({ description, image, title }: ErrorComponentInterface) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col space-y-4 items-center">
        <Image width={240} height={240} alt="Page Not Found" src={image} priority />
        <TextComponent className="text-xl capitalize font-bold ">{title}</TextComponent>
        <TextComponent className="text-small lowercase ">{description}</TextComponent>
      </div>
    </div>
  );
}
