'use client';
import { ClientComponent } from '@/components/Clients';
import { GalleryComponent } from '@/components/Gallery';
import ServiceCardComponent from '@/components/ServiceCard';
import ServiceCardShimmersComponent from '@/components/shimmers/ServiceCard';
import TextComponent from '@/components/Text';
import { Card, CardContent } from '@/components/ui/card';
import { dummyDataSource } from '@/datasources/internals/dummy';
import clientService from '@/services/client';
import galleryService from '@/services/gallery';
import referenceService from '@/services/refernce.service';
import serviceService from '@/services/service';
import { BASE_API_URL, TITLE } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { HANDSHAKE_IMAGE, IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';
import { FaPhone, FaRocket, FaSmile, FaThumbsUp } from 'react-icons/fa';

export default function AboutPage() {
  const service = serviceService.getData(3, 0, undefined, 'expensive');
  const client = clientService.getClient(10, 0);
  const gallery = galleryService.getGalleries(30, 0);
  const reference = referenceService.getReference();
  return (
    <div className="grid grid-cols-1 gap-16 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white py-12 mt-12">
            <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2 justify-center order-2 lg:order-1">
                <TextComponent className={`text-teal text-base font-regular ${robot.className}  capitalize`}>Tentang Kami</TextComponent>
                {reference.reference && <TextComponent className={`text-teal text-4xl font-extrabold ${robot.className}  capitalize`}>{reference.reference.company_nickname}</TextComponent>}
                <TextComponent className="text-teal text-base text-justify font-regular">
                  AIM Consultant adalah Consultant legalitas dan perizinan khusus Seperti Pembuatan Pendirian (PT,CV&YAYASAN), SBU Konstruksi, PKP, BPOM, Izin Edar Alat Kesehatan, IDAK, SKUP MIGAS, Pendaftaran Merek HAKI,dan ABUJAPI yang
                  berlokasi di Kota Bekasi nama dari perusahaan yang menaungi kami adalah PT. Arunika Indo Miratama. Kami berdiri bertujuan untuk membantu Negara Republik Indonesia memiliki pengusaha UMKM, Menengah dan Usaha Asing untuk
                  memiliki integritas dan memenuhi perizinan sesuai peraturan perundang-undangan yang berlaku di indonesai, dengan demikian pengusaha-pengusaha Indonesia bisa bersaing secara global dengan tingkat kredibelitas yang lebih
                  tinggi dalam pasar dagang, teknology maupun yang lainnya. Kami hadir untuk bermitra dan bertujuan untuk yang lebih tinggi . PT. Arunika Indo Miratama dipolopori dan di bentuk oleh Abdul Rahman S.H & Mira S.E yang sudah
                  memiliki pengalaman cukup Panjang dalam bisang perizinan di Indonesia pada bulan November 2024. dan di sahkan oleh notaris Lindra Nelly. S.H., M.Kn dan sudah memiliki izin lengkap.
                </TextComponent>
              </div>
              {reference.reference && (
                <div className="flex justify-end order-1 lg:order-2">
                  <Image src={`${BASE_API_URL}/${reference.reference.company_logo}`} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
                </div>
              )}
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
                    <TextComponent className="text-teal font-medium text-small text-center">Kami memberikan pelayanan secara tepat waktu dan profesional</TextComponent>
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
                    <TextComponent className="text-teal font-medium text-small text-center">Penyiapan dokumen yang fleksibel tidak perlu keluar rumah biarkan kami yang jemput atau via online</TextComponent>
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
                    <TextComponent className="text-teal font-medium text-small text-center capitalize">Prioritas dan komunikatif terkait progress pekerjaan secara berkala, dengan tim yang solid dan kenyamanan</TextComponent>
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
      {client.clients.length > 2 && (
        <div className="py-12 mx-auto px-4 container">
          <div className="flex flex-col space-y-12 text-center">
            <div className=" flex  flex-col">
              <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">You're Next</TextComponent>
              <TextComponent className="text-small font-bold text-teal hover:opacity-90">jadilah client kebanggaan kami, kami siap membantu anda</TextComponent>
            </div>
            <ClientComponent clients={client.clients} />
          </div>
        </div>
      )}
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
      <div className="container px-4 mx-auto">
        {service.loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <ServiceCardShimmersComponent key={index} />
            ))}
          </div>
        )}
        {service.services.length > 0 && (
          <div className="flex justify-center my-8">
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
      {dummyDataSource.length > 0 && (
        <div className="flex justify-center">
          <TextComponent className="text-2xl font-bold text-secondary hover:opacity-90">Testimoni</TextComponent>
        </div>
      )}
      {gallery.galleries.length > 2 && (
        <div className="px-4 container mx-auto">
          <GalleryComponent galleries={gallery.galleries} />
        </div>
      )}
    </div>
  );
}
