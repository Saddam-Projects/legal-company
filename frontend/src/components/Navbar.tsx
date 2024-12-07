import BooleanInterface from '@/interfaces/components/shared/BooleanInterface';
import ContainerComponent from './Container';
import BarMenuComponent from './BarMenu';
import navbarMenus from '@/datasources/internals/navbarMenu';
import TextComponent from './Text';
import Image from 'next/image';
import { COMPANY_LOGO } from '@/utils/images';
import { usePathname } from 'next/navigation';
import { TITLE } from '@/utils/constant';
import useNavigateTo from '@/hooks/useNavigateTo';
import { useState } from 'react';
import { SERVICES_URL } from '@/datasources/internals/menus';
import { Card, CardContent } from './ui/card';
import { FaArrowCircleRight, FaBuilding } from 'react-icons/fa';

export default function NavbarComponent({ active, setActive }: BooleanInterface) {
  const pathname = usePathname();
  const navigateTo = useNavigateTo();
  const [dropDownService, setDropdownService] = useState(false);

  const dropdownServiceHandler = (item: string) => {
    if (item.includes(SERVICES_URL)) {
      setDropdownService(true);
    }
  };
  const closeDropdownService = () => {
    setDropdownService(false);
  };

  return (
    <ContainerComponent className="h-20 bg-teal">
      <div className="flex items-center h-full pr-8">
        <div className="flex space-x-2 items-center">
          <Image src={COMPANY_LOGO} width={120} height={120} alt="Company Logo" priority className="z-50" />
          <TextComponent className="hidden lg:flex text-lg font-bold text-primary capitalize">{TITLE}</TextComponent>
        </div>
        <div className="ml-auto">
          <BarMenuComponent active={active} setActive={setActive} />
        </div>
        <div className="ml-auto justify-end h-full  hidden lg:flex px-8">
          <div className="flex items-center space-x-8">
            {navbarMenus.map((item, index) => (
              <TextComponent
                onMouseEnter={() => dropdownServiceHandler(item.to)}
                key={index}
                onClick={() => navigateTo(item.to)}
                className={`cursor-pointer capitalize text-lg font-medium text-primary ${pathname === item.to ? 'font-bold' : 'font-regular'}`}
              >
                {item.title}
              </TextComponent>
            ))}
          </div>
        </div>
      </div>
      {dropDownService && (
        <div className="fixed bottom-0 h-4/5 w-full p-4 bg-white z-40 ">
          <div className="flex flex-col items-center h-full w-full">
            <TextComponent className="text-2xl font-medium capitalize text-teal">Layanan Kami</TextComponent>
            <div className="h-[1px] bg-gray-200 w-full my-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full  overflow-y-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                <Card key={index} className="w-full h-full bg-transparent border-none shadow-none cursor-pointer hover:opacity-80">
                  <CardContent className="py-4">
                    <div className="flex space-x-4 items-center justify-center">
                      <FaBuilding className="text-teal" size={50} />
                      <div className="flex flex-col">
                        <TextComponent className="text-xl text-teal">Pendirian CV</TextComponent>
                        <TextComponent className="text-base text-teal">Lorem ipsum dolor sit amet consectetur adipisicing.</TextComponent>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div
                onClick={() => {
                  closeDropdownService();
                  navigateTo(SERVICES_URL);
                }}
                className="lg:flex hidden cursor-pointer items-center justify-center space-x-4"
              >
                <FaArrowCircleRight className="text-teal" size={30} />
                <TextComponent className="text-xl text-teal">View More</TextComponent>
              </div>
            </div>
            <div className="mt-auto">
              <div
                onClick={closeDropdownService}
                className=" hover:opacity-90 cursor-pointer px-3 py-1 shadow-lg mb-2
               rounded-full bg-primary"
              >
                <TextComponent className="font-bold text-xl text-teal">X</TextComponent>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContainerComponent>
  );
}
