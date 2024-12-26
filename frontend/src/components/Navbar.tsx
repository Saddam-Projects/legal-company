import BooleanInterface from '@/interfaces/components/shared/BooleanInterface';
import ContainerComponent from './Container';
import BarMenuComponent from './BarMenu';
import navbarMenus from '@/datasources/internals/navbarMenu';
import TextComponent from './Text';
import Image from 'next/image';
import { COMPANY_LOGO } from '@/utils/images';
import { usePathname } from 'next/navigation';
import { BASE_API_URL, TITLE } from '@/utils/constant';
import useNavigateTo from '@/hooks/useNavigateTo';
import { useState } from 'react';
import { SERVICES_URL } from '@/datasources/internals/menus';
import DropdownService from './DropdownService';
import referenceService from '@/services/refernce.service';

interface NavbarInterface extends BooleanInterface {
  logo: string;
  name: string;
}

export default function NavbarComponent({ active, setActive, name, logo }: NavbarInterface) {
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
    <ContainerComponent className="fixed top-0 left-0 w-full bg-teal z-30 h-20">
      <div className="flex items-center h-full pr-8">
        <div className="flex space-x-2 items-center">
          <img src={logo} width={120} height={120} alt="Company Logo" className="z-50 object-contain" />
          <TextComponent className="hidden lg:flex text-lg font-bold text-primary capitalize">{name}</TextComponent>
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
                onClick={() => {
                  navigateTo(item.to);
                }}
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
