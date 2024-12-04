import { Poppins, Montserrat, Roboto, Tangerine } from 'next/font/google';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
export const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});
export const robot = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '400',
});
export const tangerine = Tangerine({
  subsets: ['latin'],
  variable: '--font-tangerine',
  weight: ['400', '700'],
});
