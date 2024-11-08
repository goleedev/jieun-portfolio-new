import type { Entry } from 'contentful';

import { TypeBlogPostSkeleton } from '@/contentful/types';
import { client } from '@/utils/contentful-client';

const getBlogPostBySlug = async (
  slug: string
): Promise<Entry<TypeBlogPostSkeleton> | null> => {
  const response = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  return response.items.length > 0 ? response.items[0] : null;
};

export default getBlogPostBySlug;
