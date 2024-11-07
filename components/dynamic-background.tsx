'use client';

import { GeistMono } from 'geist/font/mono';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import useScrollBackground from '@/hooks/use-scroll-background';
import {
  getBackgroundClass,
  getBackgroundColor,
} from '@/utils/get-background-color';

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
  const [bgClass, setBgClass] = useState(getBackgroundClass(pathname));

  useEffect(() => {
    setBgClass(getBackgroundClass(pathname));
  }, [pathname]);

  const scrolledHtmlColor = '#EFEFEF';
  const ulInitialColor = 'transparent';
  const ulScrolledColor = '#FFFFFF';

  useScrollBackground(
    getBackgroundColor(pathname),
    scrolledHtmlColor,
    ulInitialColor,
    ulScrolledColor
  );

  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${GeistMono.variable} ${bgClass} transition-colors duration-500 font-pretendard`}
      suppressHydrationWarning
    >
      {children}
    </html>
  );
}
