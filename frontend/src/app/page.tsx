'use client';

import TextComponent from '@/components/Text';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FORM_URL, SERVICES_URL } from '@/datasources/internals/menus';
import useNavigateTo from '@/hooks/useNavigateTo';
import { DESCRIPTION, TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot } from '@/utils/fonts';
import { BUILDING_IMAGE, IMAGE_GRIDS, IMAGE_HEADER } from '@/utils/images';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import FormComponent from '@/components/Form';
import { FaAddressBook, FaDochub, FaMapMarkerAlt, FaRocket, FaStar } from 'react-icons/fa';
import ServiceCardComponent from '@/components/ServiceCard';
import serviceService from '@/services/service';
import LoadingComponent from '@/components/Loading';
const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Page() {
  const navigateTo = useNavigateTo();
  const service = serviceService.getData(6, 0, undefined, 'new');

  if (service.loading) return <LoadingComponent />;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-teal py-8">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4 px-4 lg:px-24 justify-center order-2 lg:order-1">
            <TextComponent className={`text-white text-4xl font-bold ${robot.className} italic`}>{DESCRIPTION}</TextComponent>
            <TextComponent className="text-white text-base font-regular">{TAGLINE_DESCRIPTION}</TextComponent>
            <div className="flex space-x-2">
              <Button className="border-1 border-primary bg-transparent text-white hover:bg-transparent hover:opacity-90">About Us</Button>
              <Button className="bg-primary text-black hover:bg-primary hover:opacity-90" onClick={() => navigateTo(SERVICES_URL)}>
                More Service
              </Button>
            </div>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <Image src={IMAGE_HEADER} className="object-cover" width={400} height={400} alt="Page Not Found" priority />
          </div>
        </div>
      </div>
      <div className="bg-white py-8">
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
            <TextComponent className={`text-black text-4xl font-bold ${robot.className} italic`}>{DESCRIPTION}</TextComponent>
            <TextComponent className="text-black text-base font-regular">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quasi id suscipit. Velit beatae veniam libero illo, debitis iste atque modi nisi ex pariatur ipsam tempora laudantium consequatur eius corrupti nemo soluta
              molestiae officiis commodi, perferendis alias vero reprehenderit et dolorum! Sequi, sapiente quam voluptas temporibus aspernatur rerum beatae ad!
            </TextComponent>
          </div>
        </div>
      </div>
      <div className="py-8 my-8 px-4 lg:px-8 flex flex-col text-center space-y-8">
        <TextComponent className="text-2xl font-bold text-secondary cursor-pointer hover:opacity-90" onClick={() => navigateTo(SERVICES_URL)}>
          Why Choose Us?
        </TextComponent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
            <CardContent className="h-full py-8">
              <div className="flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center space-y-8">
                  <FaStar className="text-4xl text-primary" />
                  <TextComponent className="text-teal font-medium text-base text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam voluptates dolorem veritatis aliquid ipsa aliquam ab? Voluptatum quia reiciendis pariatur.
                  </TextComponent>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
            <CardContent className="h-full py-8">
              <div className="flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center space-y-8">
                  <FaRocket className="text-4xl text-primary" />
                  <TextComponent className="text-teal font-medium text-base text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam voluptates dolorem veritatis aliquid ipsa aliquam ab? Voluptatum quia reiciendis pariatur.
                  </TextComponent>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
            <CardContent className="h-full py-8">
              <div className="flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center space-y-8">
                  <FaDochub className="text-4xl text-primary" />
                  <TextComponent className="text-teal font-medium text-base text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam voluptates dolorem veritatis aliquid ipsa aliquam ab? Voluptatum quia reiciendis pariatur.
                  </TextComponent>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-center py-8">
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
      <div className="py-8 bg-teal my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex justify-center">
            <div className="flex flex-col space-y-4 px-4 lg:w-3/4">
              <TextComponent className={`text-white text-xl lg:text-2xl font-medium italic capitalize`}>Pengurusan cepat, lancar dan terpercaya</TextComponent>
              <TextComponent className="text-base text-justify text-white lowercase">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ipsum neque eius quaerat enim porro ducimus! Magni, nobis, nam voluptatum laborum repudiandae dignissimos natus reiciendis incidunt fugiat blanditiis ea
                quidem!
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
      <div className="bg-white py-8 px-4 lg:px-24 ">
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
      <div className="py-2 bg-white px-4 my-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex justify-center ">
            <Image src={BUILDING_IMAGE} objectFit="contain" className="rounded-sm shadow-sm" width={520} height={520} alt="Page Not Found" priority />
          </div>
          <div className="flex items-center">
            <Card className="bg-transparent border-none w-full">
              <CardContent className="flex flex-col space-y-4 py-4">
                <TextComponent className="text-xl lg:text-2xl font-medium text-teal">Ask For Proposal?</TextComponent>
                <FormComponent />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
