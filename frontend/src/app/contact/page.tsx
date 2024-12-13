'use client';
import orderAction from '@/actions/order.action';
import FormComponent from '@/components/Form';
import MapComponent from '@/components/Map';
import TextComponent from '@/components/Text';
import { Card, CardContent } from '@/components/ui/card';
import contactSchema from '@/dtos/contact';
import { OrderDto } from '@/dtos/order';
import { BASE_API_URL, TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { BUILDING_IMAGE, BUILDING_IMAGE_2, BUILDING_IMAGE_3, CONTACT_IMAGE, IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';
import { useState } from 'react';
import { FaAddressBook, FaClock, FaInfinity, FaMapMarkerAlt, FaShieldAlt, FaStar, FaTeamspeak, FaUsers } from 'react-icons/fa';
import { z } from 'zod';
import 'leaflet/dist/leaflet.css';

export default function ContactPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const handlerSubmit = (values: z.infer<typeof contactSchema>) => {
    const orderDto: OrderDto = {
      ...values,
      order_items: [],
    };

    orderAction.create(orderDto, setLoading, setError).then(() => setSuccess(true));
  };
  return (
    <div className="grid grid-cols-1 gap-16 mt-16">
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
          <div className="flex flex-col space-y-4 justify-center">
            <TextComponent className={`text-black text-4xl capitalize font-bold ${robot.className} italic`}>get in touch</TextComponent>
            <TextComponent className="text-teal text-base font-regular">We'd love to hear from youl Whether you have questions, need support, or want to learn more about our services, our team is here to help</TextComponent>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col  space-y-2">
              <div className="p-2 rounded-lg">
                <FaMapMarkerAlt className="w-8 p-2 rounded-sm h-8 text-primary bg-teal" />
              </div>
              <TextComponent className="text-teal font-bold text-lg">Our Address</TextComponent>
              <TextComponent className="text-teal text-base">Lagoon premium office lt.Ug unit 33,lagoon ave pekayon jaya, bekasi selatan kota bekasi jawa barat</TextComponent>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="p-2 rounded-lg">
                <FaAddressBook className="w-8 p-2 rounded-sm h-8 text-primary bg-teal" />
              </div>
              <TextComponent className="text-teal font-bold text-lg">Our Contact Info</TextComponent>
              <TextComponent className="text-teal text-base">6281234567890</TextComponent>
              <TextComponent className="text-teal text-base">example.com</TextComponent>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 h-[400px] z-0">
        <MapComponent />
      </div>

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
