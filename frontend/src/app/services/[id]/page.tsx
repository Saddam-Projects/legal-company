'use client';
import { AdvertiseComponent } from '@/components/Advertise';
import ServiceCardComponent from '@/components/ServiceCard';
import TextComponent from '@/components/Text';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/entity/service';
import serviceService from '@/services/service';
import { TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { DOC_IMAGE, IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function Page() {
  const param = useParams();
  const service = serviceService.getService(param.id as string);

  const services = serviceService.getData(10, 0, undefined, 'new');

  return (
    service.service && (
      <div className="grid grid-cols-1 gap-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="bg-white py-24">
            <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-4 px-4  justify-center order-2 lg:order-1">
                <TextComponent className={`text-teal text-base font-extrabold ${robot.className}  capitalize`}>#AjukanCepat</TextComponent>
                <TextComponent className={`text-teal text-4xl font-bold ${robot.className} italic uppercase`}>{service.service.name}</TextComponent>
                <TextComponent className="text-teal text-base font-regular">
                  Langkah awal yang penting dalam memulai bisnis Anda adalah memilih nama perusahaan yang tepat, membuat rencana bisnis yang efektif, dan mengurus semua persyaratan hukum dan administrasi yang diperlukan. Dengan melakukan
                  langkah-langkah ini, Anda dapat memulai bisnis Anda dengan lancar dan lancar, serta meningkatkan kesempatan Anda untuk sukses di pasar.
                </TextComponent>
              </div>
              <div className="flex justify-end order-1 lg:order-2">
                <Image src={DOC_IMAGE} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-4 container mx-auto justify-center">
          <AdvertiseComponent />
        </div>
        <div className="container mx-auto px-4">
          <div className="px-4 flex flex-col text-center space-y-14">
            <TextComponent className="text-2xl font-bold text-secondary cursor-pointer hover:opacity-90">Yang Akan Anda Dapatkan</TextComponent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {service.service.service_terms.map((e, index) => (
                <Card key={index} className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
                  <CardContent className="h-full py-8">
                    <div className="flex flex-col items-center justify-between h-full">
                      <div className="flex flex-col items-center space-y-2">
                        <FaCheckCircle className="text-teal w-6 h-6" />
                        <TextComponent className="text-teal font-medium text-base text-center">{e.term_name}</TextComponent>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">Rekomendasi Lainnya</TextComponent>
        </div>
        <div className="container mx-auto px-4">
          {services.services.length > 0 && (
            <div className="flex justify-center">
              <div className="w-full ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {services.services.map((item, index) => (
                    <ServiceCardComponent item={item} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
