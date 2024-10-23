import React from 'react';
import Image from 'next/image';

interface ImageComponentProps {
  src: string;
  alt: string;
  className?: string;
}

function ImageComponent({
  src,
  alt,
  className,
}: ImageComponentProps): JSX.Element {
  return (
    <Image
      src={src}
      alt={alt}
      width={200}
      height={200}
      className={`p-[22px] h-[205px] ${className ?? ''}`}
      unoptimized
      loading="eager"
    />
  );
}

function TextLine({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-nowrap justify-center items-center text-[205px]">
      {children}
    </div>
  );
}

function HomeContent(): JSX.Element {
  return (
    <section className="w-full min-h-[calc(100vh-112px)] flex flex-col items-center justify-center text-center font-mono font-black tracking-tighter leading-none overflow-auto">
      <div className="flex flex-col items-center">
        <TextLine>
          <span>D</span>
          <ImageComponent src="/gifs/E.gif" alt="E gif" className="-mx-12" />
          <span>LIGH</span>
          <ImageComponent src="/gifs/T.gif" alt="T gif" className="-mx-12" />
          <span className="ml-8">IN</span>
        </TextLine>
        <TextLine>
          <span>DE</span>
          <ImageComponent src="/gifs/S.gif" alt="S gif" className="-mx-12" />
          <span>IG</span>
          <ImageComponent src="/gifs/N.gif" alt="N gif" className="-mx-9" />
        </TextLine>
      </div>
    </section>
  );
}

export default HomeContent;
