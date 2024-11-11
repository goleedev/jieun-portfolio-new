import Image from 'next/image';
import Link from 'next/link';

const ProjectTypes = ({ types }: { types: string[] }) => (
  <p className="flex gap-3">
    {types.map((type) => (
      <span
        key={type}
        className="rounded-full bg-white uppercase px-3.5 py-1.5 font-normal"
        style={{
          fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 1rem)', // Responsive font size for tags
        }}
      >
        {type}
      </span>
    ))}
  </p>
);

export default function Featured() {
  return (
    <div className="flex flex-col gap-10 md:gap-5 md:flex-row pt-10 md:pt-[100px]">
      <Link
        href="/work/personal-branding"
        className="flex-1 flex flex-col gap-4 md:gap-6"
      >
        <Image
          src={'/images/image.png'}
          alt="Image"
          width={500}
          height={500}
          className="rounded-lg object-fill w-full aspect-[4/5] md:aspect-[4/3]"
          priority
          unoptimized
        />
        <div className="flex flex-col gap-3">
          <ProjectTypes types={['BRANDING', 'Graphic']} />
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.375rem)',
              lineHeight: 'clamp(1.5rem, 2.5vw + 0.5rem, 1.875rem)',
            }}
            className="font-medium"
          >
            Personal Branding
          </p>
        </div>
      </Link>
      <Link href="/work/test" className="flex-1 flex flex-col gap-4 md:gap-6">
        <Image
          src={'/images/image.png'}
          alt="Image"
          width={500}
          height={500}
          className="rounded-lg object-fill w-full aspect-[4/5] md:aspect-[4/3]"
          priority
          unoptimized
        />
        <div className="flex flex-col gap-2 md:gap-3">
          <ProjectTypes types={['BRANDING', 'Graphic']} />
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.375rem)',
              lineHeight: 'clamp(1.5rem, 2.5vw + 0.5rem, 1.875rem)',
            }}
            className="font-medium"
          >
            Personal Branding
          </p>
        </div>
      </Link>
    </div>
  );
}
