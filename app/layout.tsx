import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import DynamicBackground from '@/components/dynamic-background';
import Footer from '@/components/footer';
import Header from '@/components/header';

import './globals.css';

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
        <main className="flex flex-col w-full h-full px-6">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
      <GoogleAnalytics gaId="" />
    </DynamicBackground>
  );
}
