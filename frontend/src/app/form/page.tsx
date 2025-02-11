'use client';

import TextComponent from '@/components/Text';
import { Card, CardContent } from '@/components/ui/card';
import { TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { BUILDING_IMAGE, BUILDING_IMAGE_3, BUILDING_IMAGE_4, IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import FormServiceComponent from '@/components/FormService';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import serviceFormSchema from '@/dtos/service';
import { useSearchParams } from 'next/navigation';
import { OrderDto } from '@/dtos/order';
import DialogSuccessComponent from '@/components/DialogSuccess';
import orderService from '@/services/order';
import DialogErrorComponent from '@/components/DialogError';

export default function Page() {
  const searchParam = useSearchParams();
  const serviceId = useMemo(() => searchParam.get('service-id') && searchParam.get('service-id'), [searchParam]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const submit = (values: z.infer<typeof serviceFormSchema>) => {
    orderService.createOrder(values, setLoading, setError, () => setSuccess(true));
  };

  return (
    <div className="grid grid-cols-1 gap-16 mt-12">
      <DialogSuccessComponent active={success} onClose={() => setSuccess(false)} message="Kami sudah menerima permintaan anda, tunggu sebentar, tim kami akan menghubungi anda" />
      <DialogErrorComponent active={error !== ''} onClose={() => setError('')} />

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-teal py-8">
          <div className="container px-4 mx-auto">
            <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-4 justify-center order-2 lg:order-1">
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
      </div>

      <div className="mx-auto container px-4">
        <div className="px-2 w-full">
          <Card className="shadow-none bg-transparent border-1 rounded-lg border-gray-200">
            <CardContent className="py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div className="order-2 lg:order-1 ">
                  <FormServiceComponent serviceId={serviceId} handler={submit} />
                </div>
                <div className="flex justify-center order-1 lg:order-2">
                  <Image src={BUILDING_IMAGE_4} objectFit="contain" className="rounded-sm shadow-sm" width={420} height={420} alt="Page Not Found" priority />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
