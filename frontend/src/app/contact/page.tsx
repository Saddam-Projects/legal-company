'use client';
import FormComponent from '@/components/Form';
import TextComponent from '@/components/Text';
import { Card, CardContent } from '@/components/ui/card';
import contactSchema from '@/dtos/contact';
import { OrderDto } from '@/dtos/order';
import { TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { BUILDING_IMAGE_3, CONTACT_IMAGE, IMAGE_HEADER, QR_IMAGE } from '@/utils/images';
import Image from 'next/image';
import { useState } from 'react';
import { FaAddressBook, FaClock, FaInfinity, FaMapMarkerAlt, FaShieldAlt, FaStar, FaTeamspeak, FaUsers } from 'react-icons/fa';
import { z } from 'zod';
import referenceService from '@/services/refernce.service';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import orderService from '@/services/order';
import serviceFormSchema from '@/dtos/service';
import DialogErrorComponent from '@/components/DialogError';
import DialogSuccessComponent from '@/components/DialogSuccess';
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function ContactPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const reference = referenceService.getReference();
  const handlerSubmit = (values: z.infer<typeof contactSchema>) => {
    const data: z.infer<typeof serviceFormSchema> = {
      email: values.email,
      message: values.message,
      name: values.name,
      phone: values.phone,
      service: '',
    };

    orderService.createOrder(data, setLoading, setError, () => setSuccess(true));
  };
  return (
    <div className="grid grid-cols-1 gap-16 mt-16">
      <DialogErrorComponent active={error !== ''} onClose={() => setError('')} />
      <DialogSuccessComponent active={success} onClose={() => setSuccess(false)} message="Kami sudah menerima permintaan anda, tunggu sebentar, tim kami akan menghubungi anda" />

      <div className="mx-auto px-4 container mt-12">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white">
            <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-4 px-4 justify-center order-2 lg:order-1">
                <TextComponent className={`text-teal text-base font-extrabold ${robot.className}  capitalize`}>#AjukanCepat</TextComponent>
                <TextComponent className={`text-teal text-4xl font-bold ${robot.className} italic capitalize`}>Ajukan Sekarang, Tim Kami akan segera proses secara langsung</TextComponent>
                <TextComponent className="text-teal text-base font-regular">{TAGLINE_DESCRIPTION}</TextComponent>
              </div>
              <div className="flex justify-end order-1 lg:order-2">
                <Image src={CONTACT_IMAGE} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="px-2 w-full ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
                <CardContent className="h-full py-8">
                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex flex-col items-center space-y-2">
                      <FaUsers className="text-4xl text-primary" />
                      <TextComponent className="text-lg font-bold text-teal capitalize">Team Work</TextComponent>
                      <TextComponent className="text-teal font-medium text-base text-center">Kami bekerja sama dengan klien kami sebagai sebuah tim.</TextComponent>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
                <CardContent className="h-full py-8">
                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex flex-col items-center space-y-2">
                      <FaClock className="text-4xl text-primary" />
                      <TextComponent className="text-lg font-bold text-teal capitalize">Tepat Waktu</TextComponent>
                      <TextComponent className="text-teal font-medium text-base text-center">Tujuan klien kami adalah tujuan kami.</TextComponent>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
                <CardContent className="h-full py-8">
                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex flex-col items-center space-y-2">
                      <FaInfinity className="text-4xl text-primary" />
                      <TextComponent className="text-lg font-bold text-teal capitalize">Belajar Berkelanjutan</TextComponent>
                      <TextComponent className="text-teal font-medium text-base text-center">Kami berusaha sebagai Organisasi Pembelajar.</TextComponent>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white container mx-auto px-4 ">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center space-y-4">
              <TextComponent className={`text-black text-4xl capitalize font-bold ${robot.className} italic`}>Contact us, okay!</TextComponent>
              <TextComponent className="text-teal text-base font-regular">We're happy to hear from you. If you have any questions, need support, or want to know more about our services, our team is ready to help.</TextComponent>
            </div>
            <img src={QR_IMAGE} width={150} height={150} className="object-contain" alt="" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col  space-y-2">
              <div className="p-2 rounded-lg">
                <FaMapMarkerAlt className="w-8 p-2 rounded-sm h-8 text-primary bg-teal" />
              </div>
              <TextComponent className="text-teal font-bold text-lg">Our Address</TextComponent>
              <TextComponent className="text-teal text-base">{reference.reference ? reference.reference.address : '-'}</TextComponent>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="p-2 rounded-lg">
                <FaAddressBook className="w-8 p-2 rounded-sm h-8 text-primary bg-teal" />
              </div>
              <TextComponent className="text-teal font-bold text-lg">Our Contact Info</TextComponent>
              <TextComponent className="text-teal text-base">{reference.reference ? reference.reference.company_phone : '-'}</TextComponent>
              <TextComponent className="text-teal text-base">{reference.reference ? reference.reference.company_email : '-'}</TextComponent>
            </div>
          </div>
        </div>
      </div>

      {reference.reference && (
        <div className="grid grid-cols-1 h-[400px] z-0">
          <MapComponent lat={reference.reference.address_lat as unknown as number} long={reference.reference.address_long as unknown as number} name={reference.reference.address} />
        </div>
      )}

      <div className="py-2 bg-white px-4 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex ">
            <Image src={`${BUILDING_IMAGE_3}`} objectFit="contain" className="rounded-sm shadow-sm" width={520} height={520} alt="Page Not Found" priority />
          </div>
          <div className="flex items-center">
            <Card className="bg-transparent border-none w-full">
              <CardContent className="flex flex-col space-y-4 py-4">
                <TextComponent className="text-xl lg:text-2xl font-medium text-teal">Ask For Proposal?</TextComponent>
                <FormComponent handler={handlerSubmit} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
