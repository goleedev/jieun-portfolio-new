import type { Asset, Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';

import { TypeBlogPostSkeleton } from '@/contentful/types';

export default function OtherPosts({
  posts,
}: {
  posts: Entry<TypeBlogPostSkeleton>[];
}) {
  if (posts.length === 0) {
    return <p>No posts available in this category.</p>;
  }

  return (
    <div className="grid gap-x-0 md:gap-x-5 gap-y-10 md:grid-cols-4 pb-[116px] md:pb-40">
      {posts.map((post) => (
        <div key={post.sys.id} className="border rounded-lg p-4 shadow-md">
          <Link href={'/blog/' + post.fields.slug}>
            <>
              <h3 className="text-xl font-semibold mb-2">
                {post.fields.title as string}
              </h3>
              <p className="text-gray-600 mb-4">
                {post.fields.description
                  ? (post.fields.description as string)
                  : 'No description available'}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Date: {post.fields.date as string}
              </p>
              <div className="mb-4">
                <strong>Types:</strong>
                <ul className="flex flex-wrap gap-2">
                  {(post.fields.types as string[]).map((type, index) => (
                    <li
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
              {post.fields.thumbnail && (
                <Image
                  src={`https:${
                    (post.fields.thumbnail as Asset)?.fields.file?.url
                  }`}
                  alt={
                    ((post.fields.thumbnail as Asset).fields.title as string) ||
                    'Thumbnail'
                  }
                  width={300}
                  height={200}
                  className="rounded-md object-cover"
                />
              )}
            </>
          </Link>
        </div>
      ))}
    </div>
  );
}
