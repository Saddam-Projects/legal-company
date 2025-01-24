import './index.css';
import LayoutComponent from '@/components/Layout';
import { TITLE } from '@/utils/constant';
import { montserrat } from '@/utils/fonts';
import { GoogleTagManager } from '@next/third-parties/google';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <script
          type="text/javascript"
          src="https://nextdev.id/rentetan-script/aim-consultant/rentetan-code.js
"
        ></script>
      </Head>
      <body className={montserrat.className}>
        <LayoutComponent>{children}</LayoutComponent>
        <GoogleTagManager gtmId="GTM-P8GK9V7Q" />
      </body>
    </html>
  );
}

export const metadata = {
  title: TITLE,
  description: 'Powered By AIM Consultant',
};
