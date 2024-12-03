import Image from 'next/image';
import TextComponent from './Text';
import { DUMMY_LOGO, IMAGE_NOT_FOUND_PAGE, WAITING_BACKGROUND } from '@/utils/images';
import { DESCRIPTION, TITLE } from '@/utils/constant';

export default function PreloadComponent() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-6">
        <TextComponent className="text-4xl italic font-bold">
          Welcome To <TextComponent className="text-4xl italic font-bold text-blue-hris">Angle Corp</TextComponent>
        </TextComponent>
        <Image src={WAITING_BACKGROUND} className="object-contain" objectFit="contain" width={280} height={280} alt="Page Not Found" priority />
        <TextComponent className="text-3xl font-extrabold">{TITLE}</TextComponent>
        <TextComponent className="text-base font-medium">{DESCRIPTION}</TextComponent>
      </div>
    </div>
  );
}
