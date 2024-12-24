'use client';

import { Suspense, useState } from 'react';
import NavbarComponent from './Navbar';
import SidebarComponent from './Sidebar';
import { ScrollArea } from './ui/scroll-area';
import ContainerComponent from './Container';
import ContextApiComponent from './ContextApi';
import { ThemeProvider } from './ThemeProvider';
import BottomBarComponent from './BottomBar';
import referenceService from '@/services/refernce.service';
import { BASE_API_URL } from '@/utils/constant';

export default function LayoutComponent({ children }: { children: React.ReactNode }) {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const reference = referenceService.getReference();

  if (reference.loading) return <div>Loading...</div>;

  return (
    reference.reference && (
      <div className="h-screen w-screen overflow-hidden bg-white text-black">
        <ContextApiComponent>
          <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
            <div className="h-full w-full flex">
              <SidebarComponent active={burgerMenuActive} setActive={setBurgerMenuActive} />
              <div className="w-full h-full flex-col ">
                <NavbarComponent name={reference.reference.company_nickname} logo={`${BASE_API_URL}/${reference.reference.company_logo}`} active={burgerMenuActive} setActive={setBurgerMenuActive} />
                <ScrollArea style={{ height: '100%' }} onClick={() => setBurgerMenuActive(false)}>
                  <ContainerComponent className="h-full w-full ">
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                  </ContainerComponent>
                  <div className="h-[10px]"></div>
                </ScrollArea>
                <BottomBarComponent email={reference.reference.company_email} phone={reference.reference.company_phone} />
              </div>
            </div>
          </ThemeProvider>
        </ContextApiComponent>
      </div>
    )
  );
}
