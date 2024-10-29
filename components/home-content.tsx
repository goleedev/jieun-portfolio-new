import React from 'react';
import Image from 'next/image';

interface ImageComponentProps {
  src: string;
  alt: string;
}

export function ImageComponent({ src, alt }: ImageComponentProps): JSX.Element {
  return (
    <Image
      src={src}
      alt={alt}
      width={210}
      height={210}
      className="image-responsive"
      unoptimized
      loading="eager"
    />
  );
}

export function TextLine({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-nowrap justify-center items-center text-responsive">
      {children}
    </div>
  );
}

function HomeContent(): JSX.Element {
  return (
    <section className="w-full min-h-[calc(100vh-128px)] flex flex-col items-center justify-center text-center font-mono font-black tracking-tighter leading-none overflow-auto cursor-default">
      <div className="flex flex-col items-center">
        <TextLine>
          <span className="md:pl-0 pl-1">D</span>
          <ImageComponent src="/gifs/E.gif" alt="E gif" />
          <span>LIGH</span>
          <ImageComponent src="/gifs/T.gif" alt="T gif" />
          <span className="sm:pl-3.5 md:pl-6 pl-1.5">IN</span>
        </TextLine>
        <TextLine>
          <span>DE</span>
          <ImageComponent src="/gifs/S.gif" alt="S gif" />
          <span>IG</span>
          <ImageComponent src="/gifs/N.gif" alt="N gif" />
        </TextLine>
      </div>
    </section>
  );
}

export default HomeContent;
