import './index.css';
import LayoutComponent from '@/components/Layout';
import { TITLE } from '@/utils/constant';
import { montserrat } from '@/utils/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}

export const metadata = {
  title: TITLE,
  description: 'Powered By AIM Consultant',
};
