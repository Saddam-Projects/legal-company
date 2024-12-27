'use client';

import TextComponent from '@/components/Text';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ABOUT_US_URL, FORM_URL, SERVICES_URL } from '@/datasources/internals/menus';
import useNavigateTo from '@/hooks/useNavigateTo';
import { ADDRESS, DESCRIPTION, EMAIL, PHONE, TITLE } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { BUILDING_IMAGE, IMAGE_GRIDS, LAW_IMAGE, QR_IMAGE } from '@/utils/images';
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
import ServiceCardShimmersComponent from '@/components/shimmers/ServiceCard';
import referenceService from '@/services/refernce.service';
import orderService from '@/services/order';
import serviceFormSchema from '@/dtos/service';
import bannerService from '@/services/banner';
import { AdvertiseComponent } from '@/components/Advertise';
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Page() {
  const navigateTo = useNavigateTo();
  const service = serviceService.getData(6, 0, undefined, 'new');
  const reference = referenceService.getReference();
  const [success, setSuccess] = useState<boolean>(false);

  const handlerSubmit = (values: z.infer<typeof contactSchema>) => {
    const data: z.infer<typeof serviceFormSchema> = {
      email: values.email,
      message: values.message,
      name: values.name,
      phone: values.phone,
      service: '',
    };

    orderService.createOrder(data, service.setLoading, service.setError, () => setSuccess(true));
  };

  const banner = bannerService.getBanners(5, 0, undefined, 'new');

  return (
    <div className="grid grid-cols-1 gap-16 mt-12">
      <DialogSuccessComponent active={success} onClose={() => setSuccess(false)} message="Kami sudah menerima permintaan anda, tunggu sebentar, tim kami akan menghubungi anda" />
      <DialogErrorComponent active={service.error !== ''} onClose={() => service.setError('')} />
      <div className="bg-teal py-8">
        <div className="container mx-auto px-4">
          <div className="grid h-full container mx-auto grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-4 justify-center order-2 lg:order-1">
              {reference.reference && <TextComponent className={`text-white text-4xl font-bold ${robot.className} italic`}>Selamat datang di {reference.reference.company_nickname} </TextComponent>}
              <TextComponent className="text-white text-base font-regular">
                Kami adalah consultant yang terkemuka dalam bidang perizinan di Indonesia, dengan reputasi yang baik dalam membantu klien kami mencapai tujuan bisnis mereka. kami siap membantu UMKM, Kelas Menengah dan Usaha Asing untuk
                berbisnis di seluruh wilayah Indonesia secara formal dan berintegritas sesuai dengan peraturan perundang-undangan di indonesia
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
            <div className="flex justify-end order-1 lg:order-2">
              <Image src={LAW_IMAGE} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white container mx-auto">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-1">
              {IMAGE_GRIDS.map((e) => (
                <Image key={e} src={e} className="object-contain shadow-sm" width={180} height={120} alt="Page Not Found" priority />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4 px-4  justify-center">
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
        <div className="px-2 w-full container mx-auto">
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
                    <TextComponent className="text-teal font-medium text-base text-center">Kebanggan kami ada pada saat system perizinan sesuai dengan kebutuhan anda yang di bentuk secara profesional</TextComponent>
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

      <div>
        {banner.banners.length > 2 && (
          <div className="flex px-4 container mx-auto justify-center">
            <AdvertiseComponent banners={banner.banners} />
          </div>
        )}
      </div>

      <div className="flex justify-center ">
        <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">Our Services</TextComponent>
      </div>
      <div className="container mx-auto px-4">
        {service.loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <ServiceCardShimmersComponent key={index} />
            ))}
          </div>
        )}
        {service.services.length > 0 && (
          <div className="flex justify-center">
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {service.services.map((item, index) => (
                  <ServiceCardComponent key={index} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className=" bg-teal py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex justify-center">
              <div className="flex flex-col space-y-4 ">
                <TextComponent className={`text-white text-xl lg:text-2xl font-medium italic capitalize`}>legalitas, solusi cerdas!</TextComponent>
                <TextComponent className="text-base text-justify text-white lowercase">
                  Segera tingkatkan kualitas bisnis usahamu dengan membuat usahamu menjadi legal dan sesuai peraturan di indonesia. AIM CONSULTANT hadir untuk membantu bisnismu menjadi semakin terintegrasi dan kredibilitas dengan waktu yang
                  cepat dan profesional AIM CONSULTANT sudah sangat berpengalaman. Segara urus legalitas usahamu dan tunggu apalagi segera hubungi kami
                </TextComponent>
              </div>
            </div>
            <div className="flex items-center">
              <div className="lg:ml-auto lg:px-12">
                <Button onClick={() => navigateTo(FORM_URL)} className="bg-primary text-teal hover:bg-primary hover:opacity-90 mx-auto" size={'lg'}>
                  Lihat Proposal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white container mx-auto px-4 ">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4 justify-center">
            <div className="flex lg:space-x-8 flex-col lg:flex-row space-y-4 lg:space-y-0">
              <TextComponent className={`text-black text-4xl capitalize font-bold ${robot.className} italic`}>get in touch</TextComponent>
              <img src={QR_IMAGE} width={100} height={100} className="object-contain" alt="" />
            </div>
            <TextComponent className="text-teal text-base font-regular">We're happy to hear from you. If you have any questions, need support, or want to know more about our services, our team is ready to help.</TextComponent>
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
      <div className="py-2 bg-white container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex ">
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
