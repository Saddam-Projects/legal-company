'use client';

import { AreaChartComponent } from '@/components/AreaChart';
import BarChartComponent from '@/components/BarChart';
import LineComponent from '@/components/Line';
import MapComponent from '@/components/Map';
import PieChartComponent from '@/components/PieChart';
import { DataTableDemo } from '@/components/Table';
import TextComponent from '@/components/Text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SERVICES_URL } from '@/datasources/internals/menus';
import { SERVICE_DUMMY } from '@/datasources/internals/services';
import useNavigateTo from '@/hooks/useNavigateTo';
import { convertToCurrency } from '@/lib/utils';
import { DESCRIPTION, TAGLINE_DESCRIPTION } from '@/utils/constant';
import { robot, tangerine } from '@/utils/fonts';
import { DUMMY_LOGO, IMAGE_GRIDS, IMAGE_HEADER, PRO_IMAGE } from '@/utils/images';
import { DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { CalendarIcon, CaretDownIcon } from '@radix-ui/react-icons';
import 'leaflet/dist/leaflet.css';
import { CheckCircle2, ListStartIcon, StarsIcon } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  const navigateTo = useNavigateTo();
  return (
    <>
      <div className="bg-teal py-8">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4 px-4 lg:px-24 justify-center order-2 lg:order-1">
            <TextComponent className={`text-white text-4xl font-bold ${robot.className} italic`}>{DESCRIPTION}</TextComponent>
            <TextComponent className="text-white text-base font-regular">{TAGLINE_DESCRIPTION}</TextComponent>
            <div className="flex space-x-2">
              <Button className="border-1 border-primary bg-transparent text-white hover:bg-transparent hover:opacity-90">About Us</Button>
              <Button className="bg-primary text-black hover:bg-primary hover:opacity-90">More Service</Button>
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
      <div className="flex justify-center py-8">
        <TextComponent className="text-2xl font-bold text-secondary cursor-pointer hover:opacity-90" onClick={() => navigateTo(SERVICES_URL)}>
          Our Services
        </TextComponent>
      </div>
      <div className="flex justify-center">
        <div className="px-2 w-full lg:w-3/4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {SERVICE_DUMMY.map((item, index) => (
              <Card key={index} className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
                <CardContent className="h-full py-8">
                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex flex-col items-center space-y-8">
                      <TextComponent className="text-black font-bold text-lg">{item.title}</TextComponent>
                      <Image objectFit="cover" quality={100} src={item.img} width={120} height={120} alt="Page Not Found" priority />
                    </div>
                    <div className="py-4">
                      <TextComponent className="text-base font-bold text-teal">{convertToCurrency(item.price)}</TextComponent>
                    </div>
                    <div className="flex flex-col space-y-2 mb-4">
                      {item.terms.map((e, index) => (
                        <div key={index} className="flex space-x-2 items-center">
                          <CheckCircle2 className="text-secondary w-4" />
                          <TextComponent>{e}</TextComponent>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Button className="bg-primary text-black hover:bg-primary hover:opacity-90 mx-auto">Select</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
