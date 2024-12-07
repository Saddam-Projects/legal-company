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
import { FaBuilding, FaRegBuilding } from 'react-icons/fa';
import serviceService from '@/services/service';
import DropdownService from './DropdownService';

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
      {dropDownService && <DropdownService closeDropdownService={closeDropdownService} />}
    </ContainerComponent>
  );
}
