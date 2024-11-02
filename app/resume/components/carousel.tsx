import Image from 'next/image';

export default function MoreCarousel() {
  return (
    <section className="flex flex-col pt-8 pb-14 sm:pt-10 sm:pb-20">
      <h2 className="pb-5 text-[28px] leading-[32px] sm:text-[44px] sm:leading-[52px] font-medium sm:pb-7">
        And More
      </h2>

      <div className="flex gap-3 sm:gap-5 overflow-x-scroll scrollbar-hide items-start justify-start snap-mandatory snap-x mt-3 mb-5">
        <Image
          src="/images/image.png"
          alt="image"
          width={500}
          height={500}
          className="snap-start scroll-m-5 w-[200px] aspect-square sm:w-[444px]"
        />
        <Image
          src="/images/image.png"
          alt="image"
          width={500}
          height={500}
          className="snap-start scroll-m-5 w-[200px] aspect-square sm:w-[444px]"
        />
        <Image
          src="/images/image.png"
          alt="image"
          width={500}
          height={500}
          className="snap-start scroll-m-5 w-[200px] aspect-square sm:w-[444px]"
        />
        <Image
          src="/images/image.png"
          alt="image"
          width={500}
          height={500}
          className="snap-start scroll-m-5 w-[200px] aspect-square sm:w-[444px]"
        />
        <Image
          src="/images/image.png"
          alt="image"
          width={500}
          height={500}
          className="snap-start scroll-m-5 w-[200px] aspect-square sm:w-[444px]"
        />
      </div>
    </section>
  );
}
