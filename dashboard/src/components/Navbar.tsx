import BooleanInterface from '@/interfaces/components/shared/BooleanInterface';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import * as fa from 'react-icons/fa';
import ContainerComponent from './Container';
import BarMenuComponent from './BarMenu';
import useContextApi from '@/hooks/useContextApi';
import useLocalStorage from '@/hooks/useLocalStorage';
import { THEME_KEY } from '@/utils/constant';

export default function NavbarComponent({ active, setActive }: BooleanInterface) {
  const { theme } = useContextApi();
  const { set } = useLocalStorage;

  return (
    <ContainerComponent className="h-20 bg-light dark:bg-dark">
      <div className="h-20 flex items-center px-2 md:border-b-1 md:border-b-gray-300">
        <BarMenuComponent active={active} setActive={setActive} />
        <div className="w-full flex items-center px-4 h-full">
          <div className="flex items-center relative z-30 space-x-4 ml-auto h-full">
            {theme && theme.theme ? (
              theme.theme === 'dark' ? (
                <fa.FaMoon
                  className="cursor-pointer"
                  onClick={() => {
                    set(THEME_KEY, 'light');
                    theme!.setTheme('light');
                  }}
                />
              ) : (
                <fa.FaSun
                  className="cursor-pointer"
                  onClick={() => {
                    set(THEME_KEY, 'dark');
                    theme!.setTheme('dark');
                  }}
                />
              )
            ) : (
              <div></div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:outline-none">
                <fa.FaRegBell />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:outline-none">
                <fa.FaRegComment />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:outline-none">
                <fa.FaRegUser />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="text-base">Profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}
