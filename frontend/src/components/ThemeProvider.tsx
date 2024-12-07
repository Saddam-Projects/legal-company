'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import useContextApi from '@/hooks/useContextApi';
import ContextInterface from '@/interfaces/contextInterface';
import { useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { THEME_KEY } from '@/utils/constant';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const ctx: ContextInterface = useContextApi();
  const localstorage = useLocalStorage;

  useEffect(() => {
    const theme = localstorage.read<'dark' | 'light'>(THEME_KEY);
    if (!theme) {
      ctx.theme!.setTheme('dark');
      localstorage.set(THEME_KEY, 'dark');
    }

    if (theme) {
      ctx.theme!.setTheme(theme);
    }
  }, [ctx.theme]);

  // if (!ctx.theme!.theme) return <PreloadComponent />;
  return (
    <NextThemesProvider forcedTheme={ctx.theme && ctx.theme.theme ? ctx.theme.theme : undefined} {...props}>
      {children}
    </NextThemesProvider>
  );
}
