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
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import FormComponent from '@/components/Form';
import { Input } from '@/components/ui/input';
import { FaAddressBook, FaDochub, FaEnvelope, FaMapMarker, FaMapMarkerAlt, FaPhone, FaRocket, FaStar } from 'react-icons/fa';
import FormServiceComponent from '@/components/FormService';
import { AdvertiseComponent } from '@/components/Advertise';
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Page() {
  const navigateTo = useNavigateTo();
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
          <AdvertiseComponent />
        </div>
      </div>
      <div className="flex justify-center my-8">
        <div className="px-2 w-full lg:w-3/4">
          <Card className="shadow-none bg-transparent border-1 rounded-lg border-gray-200">
            <CardContent className="py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div className="order-2 lg:order-1">
                  <FormServiceComponent />
                </div>
                <div className="flex justify-center order-1 lg:order-2">
                  <Image src={BUILDING_IMAGE} objectFit="contain" className="rounded-sm shadow-sm" width={520} height={520} alt="Page Not Found" priority />
                </div>
                {/* <Card className="shadow-none  bg-transparent border-1 border-gray-200 order-1 lg:order-2 h-full">
              <CardContent className="h-full">
                <div className="flex flex-col justify-between py-4 h-full">
                  <div className="flex flex-col space-y-2 h-[150px] overflow-y-auto">
                    <div className="p-2 flex justify-between rounded-lg bg-white border-1 border-gray-200">
                      <TextComponent className="text-teal text-base">Service 1</TextComponent>
                      <TextComponent className="text-base text-teal">Rp. 1.000.000</TextComponent>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between rounded-lg bg-white">
                      <TextComponent className="text-black text-sm ">Total</TextComponent>
                      <TextComponent className="text-black text-sm ">Rp. 1.000.000</TextComponent>
                    </div>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                    <div className="flex justify-between rounded-lg bg-white">
                      <TextComponent className="text-black text-sm ">Name</TextComponent>
                      <TextComponent className="text-black text-sm ">Name</TextComponent>
                    </div>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                    <div className="flex justify-between rounded-lg bg-white">
                      <TextComponent className="text-black text-sm ">Email</TextComponent>
                      <TextComponent className="text-black text-sm ">Name</TextComponent>
                    </div>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                    <div className="flex justify-between rounded-lg bg-white">
                      <TextComponent className="text-black text-sm ">Phone</TextComponent>
                      <TextComponent className="text-black text-sm ">Name</TextComponent>
                    </div>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                  </div>
                  <div className="ml-auto">
                    <Button size={'sm'} className="bg-primary text-black hover:bg-primary hover:opacity-90">
                      Kirim
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
