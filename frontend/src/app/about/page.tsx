'use client';
import { ClientComponent } from '@/components/Clients';
import { GalleryComponent } from '@/components/Gallery';
import ServiceCardComponent from '@/components/ServiceCard';
import TextComponent from '@/components/Text';
import { Card, CardContent } from '@/components/ui/card';
import serviceService from '@/services/service';
import { TAGLINE_DESCRIPTION, TITLE } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { HANDSHAKE_IMAGE, IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';
import { FaPhone, FaRocket, FaSmile, FaSpeakerDeck, FaStar, FaThumbsUp } from 'react-icons/fa';

export default function AboutPage() {
  const service = serviceService.getData(3, 0, undefined, 'expensive');
  return (
    <div className="grid grid-cols-1 gap-16 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white py-8">
            <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2 justify-center order-2 lg:order-1">
                <TextComponent className={`text-teal text-base font-regular ${robot.className}  capitalize`}>Tentang Kami</TextComponent>
                <TextComponent className={`text-teal text-4xl font-extrabold ${robot.className}  capitalize`}>{TITLE}</TextComponent>
                <TextComponent className="text-teal text-base font-regular">
                  Consultant legalitas dan perizinan khusus Seperti Pembuatan Pendirian (PT,CV&YAYASAN), SBU Konstruksi, PKP, BPOM, IzinEdarAlkes, SKUP MIGAS, Merek HAKI, ABUJAPI dan IDAK yang berlokasi di Bekasi.
                </TextComponent>
              </div>
              <div className="flex justify-end order-1 lg:order-2">
                <Image src={HANDSHAKE_IMAGE} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 container mx-auto">
        <div className="flex flex-col text-center space-y-8">
          <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">Why Choose Us?</TextComponent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
              <CardContent className="h-full py-8">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <FaRocket className="text-4xl text-primary" />
                    <TextComponent className="text-teal font-bold text-lg text-center">Proses Cepat</TextComponent>
                    <TextComponent className="text-teal font-medium text-small text-center">Kami memberikan jasa pembuatan PT dengan layanan yang cepat</TextComponent>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
              <CardContent className="h-full py-8">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <FaThumbsUp className="text-4xl text-primary" />
                    <TextComponent className="text-teal font-bold text-lg text-center">Praktis</TextComponent>
                    <TextComponent className="text-teal font-medium text-small text-center">Penyiapan dokuemn dapat dikirim via online dan dapat dijemput</TextComponent>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
              <CardContent className="h-full py-8">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <FaSmile className="text-4xl text-primary" />
                    <TextComponent className="text-teal font-bold text-lg text-center">100% Kepuasan Client</TextComponent>
                    <TextComponent className="text-teal font-medium text-small text-center capitalize">Proses yang cepat, Praktis, dan Komunikatif adalah tujuan kami</TextComponent>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
              <CardContent className="h-full py-8">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <FaPhone className="text-4xl text-primary" />
                    <TextComponent className="text-teal font-bold text-lg text-center">Bebas Konsultasi</TextComponent>
                    <TextComponent className="text-teal font-medium text-small text-center capitalize">Konsultasi bisnis anda dengan team hebat kami.</TextComponent>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="py-12 mx-auto container">
        <div className="flex flex-col space-y-12 text-center">
          <div className=" flex  flex-col">
            <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">You're Next</TextComponent>
            <TextComponent className="text-small font-bold text-teal hover:opacity-90">jadilah client kebanggaan kami, kami siap membantu anda</TextComponent>
          </div>
          <ClientComponent />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-4 justify-center order-2 lg:order-1">
              <TextComponent className={`text-teal text-base font-extrabold ${robot.className}  lowercase`}>#aimconsultant</TextComponent>
              <TextComponent className={`text-teal text-4xl font-bold ${robot.className} italic capitalize`}>kami memiliki visi misi yang kuat dan mengedepankan kepuasan pelanggan</TextComponent>
              <TextComponent className="text-teal text-base font-regular">
                Berkomitmen untuk membantu UMKM dalam proses legalitas dan perizinan berusaha di Indonesia, dengan memprioritaskan kemudahan klien untuk mulai dari pengumpulan dokumen yang dibutuhkan hingga penyelesaian alur kerja yang
                efisien dan cepat, tepat dan professional, AIM Consultant sendiri bercita-cita ingin menjadi partner yang terpercaya bagi para pengusaha / pebisnis.
              </TextComponent>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <Image src={IMAGE_HEADER} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">Layanan Kami</TextComponent>
      </div>
      <div className="container mx-auto">
        {service.services.length > 0 && (
          <div className="flex justify-center my-8">
            <div className="px-2 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {service.services.map((item, index) => (
                  <ServiceCardComponent item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">Testimoni</TextComponent>
      </div>
      <div className="px-4 container mx-auto">
        <GalleryComponent />
      </div>
    </div>
  );
}
