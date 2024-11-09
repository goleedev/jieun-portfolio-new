import type { Asset, Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';

import { TypeBlogPostSkeleton } from '@/contentful/types';
import getBlogPosts from '@/data/get-blog-posts';
import Featured from './components/featured';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const blogPosts = posts.items as Entry<TypeBlogPostSkeleton>[];

  // Split posts into featured and non-featured
  const featuredPosts = blogPosts
    .filter((post) => post.fields.isFeatured)
    .slice(0, 2);
  const nonFeaturedPosts = blogPosts.filter((post) => !post.fields.isFeatured);

  return (
    <div>
      {/* Featured posts section */}
      <Featured posts={featuredPosts} />

      {/* Non-featured posts section */}
      <div>
        {nonFeaturedPosts.map((post) => (
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
    </div>
  );
}
