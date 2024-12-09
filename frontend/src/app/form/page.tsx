'use client';

import TextComponent from '@/components/Text';
import { Card, CardContent } from '@/components/ui/card';
import { TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { BUILDING_IMAGE, IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import FormServiceComponent from '@/components/FormService';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import serviceFormSchema from '@/dtos/service';
import { useSearchParams } from 'next/navigation';
import { OrderDto } from '@/dtos/order';
import orderAction from '@/actions/order.action';
import DialogSuccessComponent from '@/components/DialogSuccess';

export default function Page() {
  const searchParam = useSearchParams();
  const serviceId = useMemo(() => searchParam.get('service-id') && searchParam.get('service-id'), [searchParam]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const submit = (values: z.infer<typeof serviceFormSchema>) => {
    const orderDto: OrderDto = {
      email: values.email,
      message: values.message,
      name: values.name,
      phone: values.phone,
      order_items: [values.service],
    };

    orderAction.create(orderDto, setLoading, setError).then(() => setSuccess(true));
  };

  return (
    <>
      <DialogSuccessComponent active={success} onClose={() => setSuccess(false)} message="Kami sudah menerima permintaan anda, tunggu sebentar, tim kami akan menghubungi anda" />
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

      <div className="flex justify-center my-8">
        <div className="px-2 w-full lg:w-3/4">
          <Card className="shadow-none bg-transparent border-1 rounded-lg border-gray-200">
            <CardContent className="py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div className="order-2 lg:order-1">
                  <FormServiceComponent serviceId={serviceId} handler={submit} />
                </div>
                <div className="flex justify-center order-1 lg:order-2">
                  <Image src={BUILDING_IMAGE} objectFit="contain" className="rounded-sm shadow-sm" width={520} height={520} alt="Page Not Found" priority />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
