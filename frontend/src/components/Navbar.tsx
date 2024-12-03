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

export default function NavbarComponent({ active, setActive }: BooleanInterface) {
  const { theme } = useContextApi();
  const { set } = useLocalStorage;

  const pathname = usePathname();

  return (
    <ContainerComponent className="h-20 bg-teal">
      <div className="flex items-center h-full px-4">
        <div className="flex space-x-2 items-center">
          <Image src={COMPANY_LOGO} width={120} height={120} alt="Company Logo" priority className="z-30" />
          <TextComponent className="hidden lg:flex text-lg font-bold text-gold capitalize">PT. Arunika Indo Miratama</TextComponent>
        </div>
        <div className="ml-auto">
          <BarMenuComponent active={active} setActive={setActive} />
        </div>
        <div className="ml-auto justify-end h-full  hidden lg:flex px-8">
          <div className="flex items-center space-x-8">
            {navbarMenus.map((item, index) =>
              item.to === SERVICES_URL ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none focus:border-none">
                    <TextComponent className={`text-lg cursor-pointer text-gold ${pathname.includes(item.to) ? 'font-bold' : 'font-regular'}`} key={index}>
                      {item.title}
                    </TextComponent>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-none hover:bg-white">
                    <DropdownMenuItem className="focus:bg-white focus:text-black text-black ">
                      <TextComponent className="text-base cursor-pointer text-black" key={index}>
                        Hello
                      </TextComponent>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <TextComponent className={`text-lg cursor-pointer text-gold ${pathname === item.to ? 'font-bold' : 'font-regular'}`} key={index}>
                  {item.title}
                </TextComponent>
              )
            )}
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}
