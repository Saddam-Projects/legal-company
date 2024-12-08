'use client';

import TextComponent from '@/components/Text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SERVICES_URL } from '@/datasources/internals/menus';
import { SERVICE_DUMMY, SERVICES } from '@/datasources/internals/services';
import useNavigateTo from '@/hooks/useNavigateTo';
import { convertToCurrency } from '@/lib/utils';
import { DESCRIPTION, TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { BUILDING_IMAGE, IMAGE_GRIDS, IMAGE_HEADER } from '@/utils/images';
import { CheckCircle2, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import FormComponent from '@/components/Form';
import { Input } from '@/components/ui/input';
import { FaAddressBook, FaDochub, FaEnvelope, FaMapMarker, FaMapMarkerAlt, FaPhone, FaRocket, FaStar } from 'react-icons/fa';
import FormServiceComponent from '@/components/FormService';
import { AdvertiseComponent } from '@/components/Advertise';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { useMemo, useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { z } from 'zod';
import serviceFormSchema from '@/dtos/service';
import { useSearchParams } from 'next/navigation';
import DialogErrorComponent from '@/components/DialogError';
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Page() {
  const searchParam = useSearchParams();
  const serviceId = useMemo(() => searchParam.get('service-id') && searchParam.get('service-id'), [searchParam]);

  const submit = (values: z.infer<typeof serviceFormSchema>) => {};
  return (
    <>
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
