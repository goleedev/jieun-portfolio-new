import type { EntryCollection } from 'contentful';

import type { TypeBlogPostSkeleton } from '@/contentful/types/TypeBlogPost';
import { client } from './contentful-client';

const getBlogPosts = async (): Promise<
  EntryCollection<TypeBlogPostSkeleton>
> => {
  const response = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: 'blogPost',
  });

  return response;
};

export default getBlogPosts;
