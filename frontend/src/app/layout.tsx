import './index.css';
import LayoutComponent from '@/components/Layout';
import { TITLE } from '@/utils/constant';
import { montserrat } from '@/utils/fonts';
import { GoogleTagManager } from '@next/third-parties/google';
import { headers } from 'next/headers';
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const canonicalUrl = headers().get('x-forwarded-url');

  return (
    <html lang="en">
      <Script async type="text/javascript" src="https://nextdev.id/rentetan-script/aim-consultant/rentetan-code.js"></Script>
      <body className={montserrat.className}>
        <LayoutComponent>{children}</LayoutComponent>
        <GoogleTagManager gtmId="GTM-P8GK9V7Q" />
        <meta name="google-site-verification" content="sSmeW29_AgPgK0I_LaEDIHvRY1znUtYfNdydAYPnmKg" />
        <link rel="canonical" href={canonicalUrl as string} />
      </body>
    </html>
  );
}

export const metadata = {
  title: TITLE,
  description: 'Powered By AIM Consultant',
};
