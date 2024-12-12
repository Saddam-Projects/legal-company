'use client';

import TextComponent from '@/components/Text';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ABOUT_US_URL, FORM_URL, SERVICES_URL } from '@/datasources/internals/menus';
import useNavigateTo from '@/hooks/useNavigateTo';
import { DESCRIPTION, TITLE } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { BUILDING_IMAGE, IMAGE_GRIDS, LAW_IMAGE } from '@/utils/images';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import FormComponent from '@/components/Form';
import { FaAddressBook, FaHandshake, FaMapMarkerAlt, FaShieldAlt, FaStar } from 'react-icons/fa';
import ServiceCardComponent from '@/components/ServiceCard';
import serviceService from '@/services/service';
import DialogErrorComponent from '@/components/DialogError';
import contactSchema from '@/dtos/contact';
import { z } from 'zod';
import { OrderDto } from '@/dtos/order';
import DialogSuccessComponent from '@/components/DialogSuccess';
import { useState } from 'react';
import orderAction from '@/actions/order.action';
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Page() {
  const navigateTo = useNavigateTo();
  const service = serviceService.getData(6, 0, undefined, 'new');
  const [success, setSuccess] = useState<boolean>(false);

  const handlerSubmit = (values: z.infer<typeof contactSchema>) => {
    const orderDto: OrderDto = {
      ...values,
      order_items: [],
    };

    orderAction.create(orderDto, service.setLoading, service.setError).then(() => setSuccess(true));
  };

  return (
    <div className="grid grid-cols-1 gap-16 mt-12">
      <DialogSuccessComponent active={success} onClose={() => setSuccess(false)} message="Kami sudah menerima permintaan anda, tunggu sebentar, tim kami akan menghubungi anda" />
      <DialogErrorComponent active={service.error !== ''} onClose={() => service.setError('')} />
      <div className="bg-teal ">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4 px-4 lg:px-24 justify-center order-2 lg:order-1">
            <TextComponent className={`text-white text-4xl font-bold ${robot.className} italic`}>Selamat datang di {TITLE} </TextComponent>
            <TextComponent className="text-white text-base font-regular">
              Kami adalah perusahaan yang terkemuka dalam bidang pendirian perusahaan, dengan reputasi yang baik dalam membantu klien kami mencapai tujuan bisnis mereka
            </TextComponent>
            <div className="flex space-x-2">
              <Button onClick={() => navigateTo(ABOUT_US_URL)} className="border-1 border-primary bg-transparent text-white hover:bg-transparent hover:opacity-90">
                About Us
              </Button>
              <Button className="bg-primary text-black hover:bg-primary hover:opacity-90" onClick={() => navigateTo(SERVICES_URL)}>
                More Service
              </Button>
            </div>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <Image src={LAW_IMAGE} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
          </div>
        </div>
      </div>
      <div className="bg-white ">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-1">
              {IMAGE_GRIDS.map((e) => (
                <Image key={e} src={e} className="object-contain shadow-sm" width={180} height={120} alt="Page Not Found" priority />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4 px-4 lg:px-12 justify-center">
            <TextComponent className={`text-secondary text-lg font-bold ${robot.className} italic`}>About US</TextComponent>
            <TextComponent className={`text-teal text-4xl font-bold ${robot.className} italic`}>{DESCRIPTION}</TextComponent>
            <TextComponent className="text-teal text-base font-regular">
              Konsultan legalitas dan perizinan khusus Pembuatan Pendirian (PT,CV & YAYASAN), SBU Konstruksi, PKP, BPOM, Izin Edar Alkes, SKUP MIGAS, HKI & ABUJAPI farmasi yang berlokasi di Bekasi. Berkomitmen untuk membantu UMKM dalam
              proses legalitas dan perizinan berusaha di Indonesia, dengan memprioritaskan kemudahan klien untuk mulai dari pengumpulan dokumen yang dibutuhkan hingga penyelesaian alur kerja.
            </TextComponent>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="px-2 w-full lg:w-3/4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
              <CardContent className="h-full py-8">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <FaHandshake className="text-4xl text-primary" />
                    <TextComponent className="text-lg font-bold text-teal">Komitmen</TextComponent>
                    <TextComponent className="text-teal font-medium text-base text-center">kami percaya bahwa komitmen adalah kunci keberhasilan.</TextComponent>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
              <CardContent className="h-full py-8">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <FaStar className="text-4xl text-primary" />
                    <TextComponent className="text-lg font-bold text-teal">Kualitas</TextComponent>
                    <TextComponent className="text-teal font-medium text-base text-center">Kebanggaan kami ada pada system perijinan yang Sesuai dengan kenutuhan anda.</TextComponent>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
              <CardContent className="h-full py-8">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <FaShieldAlt className="text-4xl text-primary" />
                    <TextComponent className="text-lg font-bold text-teal capitalize">Keselamatan & Lingkungan</TextComponent>
                    <TextComponent className="text-teal font-medium text-base text-center">Kami menghargai semua individu dan juga kesejahteraan hidup mereka.</TextComponent>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex justify-center ">
        <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">Our Services</TextComponent>
      </div>
      {service.services.length > 0 && (
        <div className="flex justify-center">
          <div className="px-2 w-full lg:w-3/4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {service.services.map((item, index) => (
                <ServiceCardComponent item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className=" bg-teal py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex justify-center">
            <div className="flex flex-col space-y-4 px-4 lg:w-3/4">
              <TextComponent className={`text-white text-xl lg:text-2xl font-medium italic capitalize`}>Pengurusan cepat, lancar dan terpercaya</TextComponent>
              <TextComponent className="text-base text-justify text-white lowercase">
                komitmen kami untuk memberikan pelayanan yang efektif, efisien, dan dapat diandalkan. Kami berdedikasi untuk memenuhi kebutuhan Anda dengan cepat, akurat, dan profesional, sehingga Anda dapat merasa nyaman dan percaya diri
                dengan pilihan Anda
              </TextComponent>
            </div>
          </div>
          <div className="flex items-center">
            <Button onClick={() => navigateTo(FORM_URL)} className="bg-primary text-teal hover:bg-primary hover:opacity-90 mx-auto" size={'lg'}>
              Lihat Proposal
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white  px-4 lg:px-24 ">
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
      <div className="py-2 bg-white px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex justify-center ">
            <Image src={`${BUILDING_IMAGE}`} objectFit="contain" className="rounded-sm shadow-sm" width={520} height={520} alt="Page Not Found" priority />
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
