'use client';

import { ImageComponent, TextLine } from '@/components/home-content';

export default function NotFound() {
  return (
    <section className="w-full flex flex-col min-h-[calc(100vh-122px)] items-center justify-center text-center">
      <section className="w-full flex items-center justify-center text-center font-mono font-black tracking-tighter leading-none cursor-default">
        <TextLine>
          <span>4</span>
          <ImageComponent src="/gifs/0.gif" alt="0 gif" className="-mx-12" />
          <span>4</span>
        </TextLine>
      </section>

      <div className="pt-[18px]">
        <p className="font-medium font-pretendard text-lg leading-10">
          Not Found
        </p>
        <p className="font-pretendard text-lg leading-0">
          Sorry, that page doesn’t exist!
        </p>
      </div>
    </section>
  );
}
