import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import DynamicBackground from '@/components/dynamic-background';
import Footer from '@/components/footer';
import Header from '@/components/header';

import './globals.css';
import { MenuProvider } from '@/utils/menu-context';

export const metadata: Metadata = {
  title: 'Jieun Jang | UIUX Designer',
  description: 'Delight in Design',
  openGraph: {
    title: 'Jieun Jang | UIUX Designer',
    description: 'Delight in Design',
    url: 'https://jieun-jang.com',
    siteName: 'Jieun Jang | UIUX Designer',
    locale: 'ko_KR',
    images: ['https://jieun-jang.com/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DynamicBackground>
      <body>
        <MenuProvider>
          <main className="flex flex-col w-full h-full px-4 md:px-6 tracking-tight">
            <Header />
            {children}
            <Footer />
          </main>
        </MenuProvider>
      </body>
      <GoogleAnalytics gaId="" />
    </DynamicBackground>
  );
}
