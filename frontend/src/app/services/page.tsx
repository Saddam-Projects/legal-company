'use client';

import TextComponent from '@/components/Text';
import { DESCRIPTION, TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';
import ServiceCardComponent from '@/components/ServiceCard';
import LoadingComponent from '@/components/Loading';
import serviceService from '@/services/service';
import { AdvertiseComponent } from '@/components/Advertise';
import DialogErrorComponent from '@/components/DialogError';

export default function Page() {
  const service = serviceService.getData(undefined, 0, undefined, 'new');

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <DialogErrorComponent active={service.error !== ''} onClose={() => service.setError('')} />
        <div className="bg-teal py-8">
          <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-4 px-4 lg:px-24 justify-center order-2 lg:order-1">
              <TextComponent className={`text-white text-4xl font-bold ${robot.className} italic`}>{DESCRIPTION}</TextComponent>
              <TextComponent className="text-white text-base font-regular">{TAGLINE_DESCRIPTION}</TextComponent>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <Image src={IMAGE_HEADER} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-8">
        <div className="px-2 w-full lg:w-3/4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {service.services.map((item, index) => (
              <ServiceCardComponent index={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
