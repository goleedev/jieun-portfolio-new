'use client';

import { ImageComponent, TextLine } from '@/components/home-content';

export default function NotFound() {
  return (
    <section className="w-full flex flex-col min-h-[calc(100vh-124px)] pb-4 sm:min-h-[calc(100vh-138px)] items-center justify-center text-center">
      <section className="w-full flex items-center justify-center text-center font-mono font-black tracking-tighter leading-none cursor-default">
        <TextLine>
          <span>4</span>
          <ImageComponent src="/gifs/0.gif" alt="0 gif" />
          <span>4</span>
        </TextLine>
      </section>

      <div className="pt-7 sm:pt-[18px] flex flex-col gap-1 sm:gap-0">
        <p className="font-medium font-pretendard text-[22px] leading-[30px] sm:text-[28px] sm:leading-10">
          Not Found
        </p>
        <p className="font-pretendard sm:text-lg leading-0">
          Sorry, that page doesn’t exist!
        </p>
      </div>
    </section>
  );
}
