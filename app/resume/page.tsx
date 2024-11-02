import Image from 'next/image';

import HomeContent from '@/components/home-content';
import List from './components/list';
import MoreCarousel from './components/carousel';

export default function ResumePage() {
  return (
    <>
      <Image
        src="/images/image8.png"
        alt="smile"
        width={300}
        height={300}
        className="-rotate-[15deg] absolute -z-10 smile-responsive"
        unoptimized
      />
      <Image
        src="/images/image1.png"
        alt="clip"
        width={400}
        height={200}
        className="rotate-[15deg] absolute clip-responsive md:-z-1"
        unoptimized
      />
      <HomeContent />
      <Image
        src="/images/image5.png"
        alt="earphone"
        width={250}
        height={350}
        className="absolute earphone-responsive"
        unoptimized
      />
      <p className="w-full flex flex-col items-center md:whitespace-nowrap lg:flex-row md:pb-6 pb-5 md:text-lg md:font-medium font-normal text-sm leading-5 md:leading-6 text-center justify-center">
        <span>Creating diverse works</span>
        <span>through UI/UX design and visual identity.</span>
      </p>

      <List />
      <MoreCarousel />
    </>
  );
}
