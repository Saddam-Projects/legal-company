import Image from 'next/image';
import TextComponent from './Text';
import { DUMMY_LOGO, IMAGE_NOT_FOUND_PAGE, WAITING_BACKGROUND } from '@/utils/images';
import { DESCRIPTION, TITLE } from '@/utils/constant';

export default function PreloadComponent() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-6">
        <TextComponent>Loading....</TextComponent>
      </div>
    </div>
  );
}
