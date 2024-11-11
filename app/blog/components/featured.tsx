import Image from 'next/image';
import Link from 'next/link';
import type { Asset, Entry } from 'contentful';
import { TypeBlogPostSkeleton } from '@/contentful/types';

const ProjectTypes = ({ types }: { types: string[] }) => (
  <p className="flex gap-1 md:gap-2">
    {types.map((type) => (
      <span
        key={type}
        className="rounded-full bg-white uppercase px-3.5 py-1.5 font-normal"
        style={{
          fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 1rem)',
          lineHeight: 'clamp(1rem, 1.5vw + 0.25rem, 1.25rem)',
        }}
      >
        {type}
      </span>
    ))}
  </p>
);

export default function Featured({
  posts,
}: {
  posts: Entry<TypeBlogPostSkeleton>[];
}) {
  return (
    <div className="flex flex-col gap-10 md:gap-5 md:flex-row pt-10 md:pt-[100px]">
      <p className="visible md:hidden pb-6 text-[28px] font-medium leading-[34px]">
        Featured Posts
      </p>
      {posts.map((post) => (
        <Link
          href={`/blog/${post.fields.slug}`}
          key={post.sys.id}
          className="flex-1 flex flex-col gap-6"
        >
          <Image
            src={`https:${(post.fields.thumbnail as Asset).fields.file?.url}`}
            alt={
              ((post.fields.thumbnail as Asset).fields.title as string) ||
              'Featured Thumbnail'
            }
            width={500}
            height={500}
            className="rounded-lg object-fill w-full aspect-[4/5] sm:aspect-[4/3]"
            priority
            unoptimized
          />
          <div className="flex flex-col gap-3">
            <div className="flex gap-1 md:gap-2 items-center">
              <ProjectTypes types={post.fields.types as string[]} />
              <p className="text-[#949494] text-xs md:text-sm">
                {post.fields.date as string}
              </p>
            </div>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw + 0.5rem, 1.375rem)',
                lineHeight: 'clamp(1.5rem, 2.5vw + 0.5rem, 1.875rem)',
              }}
              className="font-medium"
            >
              {post.fields.title as string}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
