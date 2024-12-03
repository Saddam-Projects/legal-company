import { useState } from 'react';

export default function useThemeState() {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

  return {
    theme,
    setTheme,
  };
}
