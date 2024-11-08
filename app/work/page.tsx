import type { Asset, Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';

import { TypeWorkSkeleton } from '@/contentful/types';
import getWork from '@/data/get-work';
import Featured from './components/featured';
import Header from './components/header';

export default async function WorkPage() {
  const works = await getWork();
  const workItems = works.items as Entry<TypeWorkSkeleton>[];

  return (
    <section className="pt-10 pb-[120px] md:pt-16 md:pb-[160px]">
      <Header />
      <Featured />

      <div>
        {workItems.map((work) => (
          <Link href={'/work/' + work.fields.slug} key={work.sys.id}>
            <h2>{work.fields.title as string}</h2>
            <p>Slug: {work.fields.slug as string}</p>
            <div>
              <strong>Types:</strong>
              <ul>
                {(work.fields.types as string[]).map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
            {work.fields.thumbnail && (
              <Image
                src={`https:${
                  (work.fields.thumbnail as Asset)?.fields.file?.url
                }`}
                alt={
                  ((work.fields.thumbnail as Asset).fields.file
                    ?.fileName as string) || 'Thumbnail'
                }
                width={200} // Adjust the width as needed
                height={150} // Adjust the height as needed
              />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
