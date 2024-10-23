'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import localFont from 'next/font/local';

import { getBackgroundColor } from '@/utils/get-background-color';

const pretendard = localFont({
  src: '../app/fonts/PretendardVariable.ttf',
  variable: '--font-pretendard',
  weight: '100 900',
});

export default function DynamicBackground({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const bgColor = getBackgroundColor(pathname);

  return (
    <html
      lang="en"
      className={`${pretendard.variable} ${GeistSans.variable} ${GeistMono.variable} transition-colors duration-500`}
      suppressHydrationWarning
      style={{
        backgroundColor: bgColor,
      }}
    >
      {children}
    </html>
  );
}
