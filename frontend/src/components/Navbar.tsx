import BooleanInterface from '@/interfaces/components/shared/BooleanInterface';
import ContainerComponent from './Container';
import BarMenuComponent from './BarMenu';
import useContextApi from '@/hooks/useContextApi';
import useLocalStorage from '@/hooks/useLocalStorage';
import navbarMenus from '@/datasources/internals/navbarMenu';
import TextComponent from './Text';
import Image from 'next/image';
import { COMPANY_LOGO } from '@/utils/images';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { SERVICES_URL } from '@/datasources/internals/menus';
import { usePathname } from 'next/navigation';
import { TITLE } from '@/utils/constant';
import useNavigateTo from '@/hooks/useNavigateTo';

export default function NavbarComponent({ active, setActive }: BooleanInterface) {
  const { theme } = useContextApi();
  const { set } = useLocalStorage;

  const pathname = usePathname();
  const navigateTo = useNavigateTo();

  return (
    <ContainerComponent className="h-20 bg-teal">
      <div className="flex items-center h-full pr-8">
        <div className="flex space-x-2 items-center">
          <Image src={COMPANY_LOGO} width={120} height={120} alt="Company Logo" priority className="z-30" />
          <TextComponent className="hidden lg:flex text-lg font-bold text-primary capitalize">{TITLE}</TextComponent>
        </div>
        <div className="ml-auto">
          <BarMenuComponent active={active} setActive={setActive} />
        </div>
        <div className="ml-auto justify-end h-full  hidden lg:flex px-8">
          <div className="flex items-center space-x-8">
            {navbarMenus.map((item, index) => (
              <TextComponent key={index} onClick={() => navigateTo(item.to)} className={`cursor-pointer capitalize text-lg font-medium text-primary ${pathname === item.to ? 'font-bold' : 'font-regular'}`}>
                {item.title}
              </TextComponent>
            ))}
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}
