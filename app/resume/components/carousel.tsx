import Image from 'next/image';

export default function MoreCarousel() {
  return (
    <section className="flex flex-col pt-8 pb-14 sm:pt-10 sm:pb-20">
      <h2
        style={{
          fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.75rem)',
          lineHeight: 'clamp(2rem, 2.5vw + 1rem, 3.25rem)',
        }}
        className="pb-5 font-medium sm:pb-7"
      >
        And More
      </h2>

      <div className="flex gap-3 sm:gap-5 overflow-x-scroll scrollbar-hidden items-start justify-start snap-mandatory snap-x mt-3 mb-5">
        {Array(5)
          .fill('/images/image.png')
          .map((src, index) => (
            <Image
              key={index}
              src={src}
              alt="image"
              width={500}
              height={500}
              className="snap-start scroll-m-5 aspect-square"
              style={{
                width: 'clamp(8rem, 20vw, 27.75rem)',
              }}
              unoptimized
              priority
            />
          ))}
      </div>
    </section>
  );
}
