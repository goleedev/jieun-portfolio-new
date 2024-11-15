import type { Asset, Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';

import { TypeBlogPostSkeleton } from '@/contentful/types';
import { ProjectTypes } from './featured';

export default function OtherPosts({
  posts,
}: {
  posts: Entry<TypeBlogPostSkeleton>[];
}) {
  if (posts.length === 0) {
    return <p>No posts available in this category.</p>;
  }

  return (
    <div className="grid gap-x-0 md:gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-4 pb-[116px] md:pb-40">
      {posts.map((post) => (
        <Link
          key={post.sys.id}
          href={'/blog/' + post.fields.slug}
          className="flex-1 flex flex-col gap-4 md:gap-6"
        >
          {post.fields.thumbnail && (
            <Image
              src={`https:${
                (post.fields.thumbnail as Asset)?.fields.file?.url
              }`}
              alt={
                ((post.fields.thumbnail as Asset).fields.title as string) ||
                'Thumbnail'
              }
              width={400}
              height={400}
              className="rounded-md object-cover w-full"
            />
          )}
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
