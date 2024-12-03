import ContextInterface from '@/interfaces/contextInterface';
import store from '@/states/store';
import useThemeState from '@/states/theme';
import { createContext, useContext } from 'react';

export const context = createContext<ContextInterface>(store);

export default function ContextApiComponent({ children }: { children: React.ReactNode }) {
  const { setTheme, theme } = useThemeState();

  const states = {
    theme: {
      theme,
      setTheme,
    },
  };

  return <context.Provider value={states}>{children}</context.Provider>;
}
