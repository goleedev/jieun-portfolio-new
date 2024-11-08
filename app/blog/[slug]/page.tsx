import type { Asset } from 'contentful';
import Image from 'next/image';

import getBlogPostBySlug from '@/data/get-blog-post';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return <p>Blog post not found.</p>;
  }

  return (
    <div>
      <h1>{post.fields.title as string}</h1>
      <p>
        {post.fields.date ? (post.fields.date as string) : 'No date available'}
      </p>
      <div>
        {post.fields.thumbnail && (
          <Image
            src={`https:${(post.fields.thumbnail as Asset).fields.file?.url}`}
            alt={
              ((post.fields.thumbnail as Asset).fields.title as string) ||
              'Blog Thumbnail'
            }
            width={600} // Adjust as needed
            height={400} // Adjust as needed
          />
        )}
      </div>
      <div>
        <strong>Types:</strong>
        <ul>
          {(post.fields.types as string[]).map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
      <div>
        {post.fields.content &&
          documentToReactComponents(post.fields.content as Document)}
      </div>
    </div>
  );
}
