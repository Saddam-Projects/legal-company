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
import { useEffect, useState } from 'react';
import { Service } from '@/entity/service';
import { getData } from '@/actions/service.action';
import ServiceCardComponent from '@/components/ServiceCard';
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Page() {
  const navigateTo = useNavigateTo();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getData(1000 * 1000, 0, undefined, 'new')
      .then((res) => {
        setServices(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
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
            {services.map((item, index) => (
              <ServiceCardComponent index={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
