import { Entry } from 'contentful';

import { TypeBlogPostSkeleton } from '@/contentful/types';
import { client } from '@/utils/contentful-client';

export async function getRelatedPosts(
  category: string,
  currentPostId: string
): Promise<Entry<TypeBlogPostSkeleton>[]> {
  const response = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.category': category,
    'sys.id[ne]': currentPostId,
    limit: 5,
  });

  return response.items;
}
