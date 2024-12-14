'use client';

import { Suspense, useState } from 'react';
import NavbarComponent from './Navbar';
import SidebarComponent from './Sidebar';
import { ScrollArea } from './ui/scroll-area';
import ContainerComponent from './Container';
import ContextApiComponent from './ContextApi';
import { ThemeProvider } from './ThemeProvider';

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <ContextApiComponent>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <div className="h-full w-full flex">
            <SidebarComponent active={burgerMenuActive} setActive={setBurgerMenuActive} />
            {burgerMenuActive && <div className="w-screen h-screen left-0 top-0 absolute z-10 lg:hidden" onClick={() => setBurgerMenuActive(false)}></div>}
            <div className="w-full h-full flex-col bg-white">
              <NavbarComponent active={burgerMenuActive} setActive={setBurgerMenuActive} />
              <ScrollArea style={{ height: '88%' }}>
                <ContainerComponent className="p-4 h-full w-full dark:bg-content-dark bg-content-light">
                  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </ContainerComponent>
              </ScrollArea>
              <ContainerComponent style={{ height: '12%' }} className="dark:bg-content-dark bg-content-light"></ContainerComponent>
            </div>
          </div>
        </ThemeProvider>
      </ContextApiComponent>
    </div>
  );
}
