import type { Asset, Entry } from 'contentful';

import { TypeBlogPostSkeleton } from '@/contentful/types';
import getBlogPosts from '@/utils/get-blog-posts';
import Image from 'next/image';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const blogPosts = posts.items as Entry<TypeBlogPostSkeleton>[];

  return (
    <div>
      {blogPosts.map((post) => (
        <div key={post.sys.id}>
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
            <>
              <Image
                src={`https:${
                  (post.fields.thumbnail as Asset)?.fields.file?.url
                }`}
                alt={
                  ((post.fields.thumbnail as Asset).fields.file
                    ?.fileName as string) || 'Thumbnail'
                }
                width={200} // Adjust the width as needed
                height={150} // Adjust the height as needed
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
