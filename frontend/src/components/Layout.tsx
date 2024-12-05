'use client';

import { Suspense, useState } from 'react';
import NavbarComponent from './Navbar';
import SidebarComponent from './Sidebar';
import { ScrollArea } from './ui/scroll-area';
import ContainerComponent from './Container';
import ContextApiComponent from './ContextApi';
import { ThemeProvider } from './ThemeProvider';
import BottomBarComponent from './BottomBar';
import LiveChatComponent from './LiveChat';

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-black">
      <ContextApiComponent>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <div className="h-full w-full flex">
            <SidebarComponent active={burgerMenuActive} setActive={setBurgerMenuActive} />
            {burgerMenuActive && <div className="w-screen h-screen left-0 top-0 absolute z-10 lg:hidden" onClick={() => setBurgerMenuActive(false)}></div>}
            <div className="w-full h-full flex-col ">
              <NavbarComponent active={burgerMenuActive} setActive={setBurgerMenuActive} />
              <ScrollArea style={{ height: '100%' }}>
                <ContainerComponent className="h-full w-full ">
                  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </ContainerComponent>
                <div className="h-[50px]"></div>
              </ScrollArea>
              <BottomBarComponent />
              {/* <LiveChatComponent /> */}
            </div>
          </div>
        </ThemeProvider>
      </ContextApiComponent>
    </div>
  );
}
