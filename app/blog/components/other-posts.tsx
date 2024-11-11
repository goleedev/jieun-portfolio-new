import { Asset, Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';

import { TypeBlogPostSkeleton } from '@/contentful/types';

export default function OtherPosts({
  posts,
}: {
  posts: Entry<TypeBlogPostSkeleton>[];
}) {
  return (
    <div>
      {posts.map((post) => (
        <Link href={'/blog/' + post.fields.slug} key={post.sys.id}>
          <h2>{post.fields.title as string}</h2>
          <p>
            {post.fields.description
              ? (post.fields.description as string)
              : 'No description available'}
          </p>
          <p>Date: {post.fields.date as string}</p>
          <div>
            <strong>Types:</strong>
            <ul>
              {(post.fields.types as string[]).map((type, index) => (
                <li key={index}>{type}</li>
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
              width={200}
              height={150}
            />
          )}
        </Link>
      ))}
    </div>
  );
}
