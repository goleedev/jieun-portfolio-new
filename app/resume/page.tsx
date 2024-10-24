import HomeContent from '@/components/home-content';
import Image from 'next/image';

export default function ResumePage() {
  return (
    <>
      <Image
        src="/images/image8.png"
        alt="smile"
        width={300}
        height={300}
        className="w-[280px] h-[280px] -rotate-[15deg] absolute top-[117px] left-10 -z-10"
        unoptimized
      />
      <Image
        src="/images/image1.png"
        alt="smile"
        width={400}
        height={200}
        className="w-[370px] h-[196px] rotate-[15deg] absolute top-[64px] right-11"
        unoptimized
      />
      <HomeContent />
      <Image
        src="/images/image5.png"
        alt="smile"
        width={250}
        height={350}
        className="w-[248px] h-[332px] absolute bottom-2.5 inset-x-[calc(50%-124px)]"
        unoptimized
      />
    </>
  );
}
