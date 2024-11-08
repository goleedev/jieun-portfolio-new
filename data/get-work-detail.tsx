import type { Entry } from 'contentful';

import { TypeWorkDetailSkeleton } from '@/contentful/types';
import { client } from '@/utils/contentful-client';

const getWorkDetailBySlug = async (
  slug: string
): Promise<Entry<TypeWorkDetailSkeleton> | null> => {
  const response = await client.getEntries<TypeWorkDetailSkeleton>({
    content_type: 'workDetail',
    'fields.work.sys.contentType.sys.id': 'work',
    'fields.work.fields.slug': slug,
    limit: 1,
  });

  return response.items.length > 0 ? response.items[0] : null;
};

export default getWorkDetailBySlug;
