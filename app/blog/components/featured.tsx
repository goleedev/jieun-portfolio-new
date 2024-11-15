import Image from 'next/image';
import Link from 'next/link';
import type { Asset, Entry } from 'contentful';
import { TypeBlogPostSkeleton } from '@/contentful/types';

export const ProjectTypes = ({ types }: { types: string[] }) => (
  <p className="flex gap-1 md:gap-2">
    {types.map((type) => (
      <span
        key={type}
        className="rounded-full bg-white uppercase px-3.5 py-1.5 font-normal"
        style={{
          fontSize: 'clamp(10px, 1.2vw, 14px)',
          lineHeight: 'clamp(14px, 1.2vw, 20px)',
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
      <p className="visible md:hidden -mb-4 text-[28px] font-medium leading-[34px]">
        Featured Posts
      </p>
      {posts.map((post) => (
        <Link
          href={`/blog/${post.fields.slug}`}
          key={post.sys.id}
          className="flex-1 flex flex-col gap-4 md:gap-6"
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
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex gap-1 md:gap-2 items-center">
              <ProjectTypes types={post.fields.types as string[]} />
              <p className="text-[#949494] text-xs md:text-sm">
                {post.fields.date as string}
              </p>
            </div>

            <p
              style={{
                fontSize: 'clamp(18px, 1.2vw, 22px)',
                lineHeight: 'clamp(24px, 1.2vw, 32px)',
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
