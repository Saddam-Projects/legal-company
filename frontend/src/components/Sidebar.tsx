'use client';
import { ScrollArea } from './ui/scroll-area';
import { useState } from 'react';
import navbarMenus from '@/datasources/internals/navbarMenu';
import { INavbarMenu } from '@/interfaces/components/MenuInterface';
import BooleanInterface from '@/interfaces/components/shared/BooleanInterface';
import TextComponent from './Text';
import ContainerComponent from './Container';
import { usePathname } from 'next/navigation';
import useNavigateTo from '@/hooks/useNavigateTo';

export default function SidebarComponent({ active, setActive }: BooleanInterface) {
  const [childMenuActive, setChildMenuActive] = useState<INavbarMenu | null>(null);

  const onClickMenu = (item: INavbarMenu) => {
    if (childMenuActive && item.title === childMenuActive.title) {
      setChildMenuActive(null);
      return;
    }

    setChildMenuActive(item);
  };

  const pathName = usePathname();
  const navigate = useNavigateTo();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <ContainerComponent className={`${active ? 'flex' : 'hidden'} fixed lg:hidden z-30 w-3/5 px-3 xl:w-1/5 h-full flex-col bg-teal`}>
      <div className="h-20 flex flex-col items-center justify-center py-4"></div>
      <ScrollArea style={{ height: '99%' }}>
        <div className="h-full flex flex-col space-y-6 py-5">
          {navbarMenus.map((item, index) =>
            item.childrens ? (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onClickMenu(item)}>
                  <item.icon className="text-white" />
                  <TextComponent className={`capitalize text-base  ${pathName === item.to ? 'font-bold' : 'font-regular'}`}>{item.title}</TextComponent>
                </div>
                {childMenuActive && childMenuActive.title === item.title && (
                  <div className="ml-6 flex flex-col space-y-4 pt-4">
                    {item.childrens.map((child, index) => (
                      <TextComponent key={index} onClick={() => navigateTo(child.to)} className={`cursor-pointer capitalize text-base text-white  ${pathName === child.to ? 'font-bold' : 'font-regular'}`}>
                        {child.title}
                      </TextComponent>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <item.icon className="text-white" />
                  <TextComponent onClick={() => navigateTo(item.to)} className={`cursor-pointer text-white capitalize text-base  ${pathName === item.to ? 'font-bold' : 'font-regular'}`}>
                    {item.title}
                  </TextComponent>
                </div>
              </div>
            )
          )}
        </div>
      </ScrollArea>
    </ContainerComponent>
  );
}
