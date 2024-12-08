import TextComponent from '@/components/Text';
import { TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-teal py-8">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4 px-4 lg:px-24 justify-center order-2 lg:order-1">
            <TextComponent className={`text-white text-base font-extrabold ${robot.className}  capitalize`}>#AjukanCepat</TextComponent>
            <TextComponent className={`text-white text-4xl font-bold ${robot.className} italic capitalize`}>Ajukan Sekarang, Tim Kami akan segera proses secara langsung</TextComponent>
            <TextComponent className="text-white text-base font-regular">{TAGLINE_DESCRIPTION}</TextComponent>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <Image src={IMAGE_HEADER} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
          </div>
        </div>
      </div>
    </div>
  );
}
