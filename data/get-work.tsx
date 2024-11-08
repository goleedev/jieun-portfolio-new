import type { EntryCollection } from 'contentful';

import { TypeWorkSkeleton } from '@/contentful/types';
import { client } from '@/utils/contentful-client';

const getWork = async (): Promise<EntryCollection<TypeWorkSkeleton>> => {
  const response = await client.getEntries<TypeWorkSkeleton>({
    content_type: 'work',
  });

  return response;
};

export default getWork;
