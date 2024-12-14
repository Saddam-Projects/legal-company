export default interface ThemeContextInterface {
  theme: 'dark' | 'light' | null;
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light' | null>>;
}
