import type { Asset } from 'contentful';
import Image from 'next/image';

import getWorkDetailBySlug from '@/data/get-work-detail';

export default async function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const detail = await getWorkDetailBySlug(slug);

  if (!detail) {
    return <p>Work detail not found.</p>;
  }

  const renderSection = (
    title: string | undefined,
    content: string | undefined,
    images: (Asset | undefined)[] | undefined,
    sectionNum: number
  ) => (
    <div key={`section-${sectionNum}`}>
      {title && <h3>{title}</h3>}
      {content && <p>{content}</p>}
      {images &&
        images.map((img, idx) => {
          const asset = img as Asset | undefined;
          if (
            asset &&
            asset.fields &&
            asset.fields.file &&
            asset.fields.file.url
          ) {
            return (
              <Image
                key={idx}
                src={`https:${asset.fields.file.url}`}
                alt={
                  (asset.fields.title as string) ||
                  `Section ${sectionNum} Image`
                }
                width={200} // Adjust the width as needed
                height={150} // Adjust the height as needed
              />
            );
          }
          return null;
        })}
    </div>
  );

  return (
    <div>
      <h2>Role: {detail.fields.role as string}</h2>
      <p>Year: {detail.fields.year as string}</p>
      <p>Services: {detail.fields.services as string}</p>
      <p>Link: {(detail.fields.link as string) || 'No link provided'}</p>

      {/* Explicitly render each section */}
      {renderSection(
        detail.fields.section1title as string | undefined,
        detail.fields.section1content as string | undefined,
        detail.fields.section1images as (Asset | undefined)[] | undefined,
        1
      )}
      {renderSection(
        detail.fields.section2title as string | undefined,
        detail.fields.section2content as string | undefined,
        detail.fields.section2images as (Asset | undefined)[] | undefined,
        2
      )}
      {renderSection(
        detail.fields.section3title as string | undefined,
        detail.fields.section3content as string | undefined,
        detail.fields.section3images as (Asset | undefined)[] | undefined,
        3
      )}
      {renderSection(
        detail.fields.section4title as string | undefined,
        detail.fields.section4content as string | undefined,
        detail.fields.section4images as (Asset | undefined)[] | undefined,
        4
      )}
    </div>
  );
}
