import type { Asset, Entry } from 'contentful';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { CalendarIcon } from '@/components/assets';
import getBlogPostBySlug from '@/data/get-blog-post';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, MARKS, Node } from '@contentful/rich-text-types';
import { ProjectTypes } from '../components/featured';
import { getRelatedPosts } from '@/data/get-related-posts';
import getBlogPosts from '@/data/get-blog-posts';
import { TypeBlogPostSkeleton } from '@/contentful/types';
import Link from 'next/link';

function CodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter language="typescript" style={darcula}>
      {code}
    </SyntaxHighlighter>
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return <p>Blog post not found.</p>;
  }

  const relatedPosts = await getRelatedPosts(
    post.fields.category as string,
    post.sys.id
  );
  const allPosts = (await getBlogPosts())
    .items as Entry<TypeBlogPostSkeleton>[];

  const sortedPosts = allPosts.sort(
    (a, b) =>
      new Date(b.fields.date as string).getTime() -
      new Date(a.fields.date as string).getTime()
  );

  const currentIndex = sortedPosts.findIndex((p) => p.sys.id === post.sys.id);
  const previousPost = sortedPosts[currentIndex + 1] || null;
  const nextPost = sortedPosts[currentIndex - 1] || null;

  const renderOptions: Options = {
    renderMark: {
      [MARKS.CODE]: (text) => <CodeBlock code={text as string} />,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
        <div>{children}</div>
      ),
      [BLOCKS.HEADING_1]: (node: Node, children: React.ReactNode) => (
        <h1 className="text-3xl font-bold my-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => (
        <h2 className="text-2xl font-semibold my-3">{children}</h2>
      ),
      [BLOCKS.QUOTE]: (node: Node, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-black pl-4 italic my-4 text-black">
          {children}
        </blockquote>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const asset = node.data.target as Asset;
        const imageUrl = `https:${asset.fields.file?.url}`;
        const imageAlt = asset.fields.title || 'Embedded Image';

        const imageWidth =
          (
            asset.fields.file?.details as
              | { image: { width: number; height: number } }
              | undefined
          )?.image?.width || 600;
        const imageHeight =
          (
            asset.fields.file?.details as {
              image: { width: number; height: number };
            }
          )?.image?.height || 400;

        return (
          <div className="my-6 flex justify-center">
            <Image
              src={imageUrl}
              alt={imageAlt as string}
              width={imageWidth}
              height={imageHeight}
              className="rounded-lg object-contain"
            />
          </div>
        );
      },
    },
  };

  return (
    <div className="px-0 md:px-5">
      <div className="pt-10 md:pt-20 pb-[60px] md:pb-[84px]">
        <div className="max-w-[720px] w-full mx-auto flex flex-col text-center pb-10 gap-8 md:gap-10 md:pb-20">
          <div className="flex justify-center">
            {post.fields.thumbnail && (
              <Image
                src={`https:${
                  (post.fields.thumbnail as Asset).fields.file?.url
                }`}
                alt={
                  ((post.fields.thumbnail as Asset).fields.title as string) ||
                  'Blog Thumbnail'
                }
                width={600}
                height={400}
                className="rounded-lg"
              />
            )}
          </div>
          <div>
            <h1 className="text-[28px] leading-9 md:text-[38px] md:leading-[45px] font-semibold">
              {post.fields.title as string}
            </h1>
            <p className="text-[#949494] font-medium text-sm leading-5 md:text-lg md:leading-6 pt-2">
              {post.fields.description as string}
            </p>
          </div>
          <div className="flex justify-center gap-1 md:gap-2 pt-0 md:pt-2 ">
            <ProjectTypes types={(post.fields.types as string[]) || []} />
            <span
              className="flex items-center gap-0.5 rounded-full bg-white uppercase px-3.5 py-1.5 font-normal"
              style={{
                fontSize: 'clamp(10px, 1.2vw, 14px)',
                lineHeight: 'clamp(14px, 1.2vw, 20px)',
              }}
            >
              <CalendarIcon
                width={16}
                height={16}
                className="w-3 h-3 md:h-4 md:w-4"
              />
              {post.fields.date
                ? (post.fields.date as string)
                : 'No date available'}
            </span>
          </div>
        </div>
        <div className="border-t border-[#CCC]">
          <div className="rich-text-content flex flex-col gap-2 md:gap-4 max-w-[720px] w-full mx-auto pt-[60px] md:pt-20">
            {post.fields.content &&
              documentToReactComponents(
                post.fields.content as Document,
                renderOptions
              )}
          </div>
        </div>
      </div>

      <div className="pt-8 md:pt-10 border-t border-[#CCC]">
        <h3 className="text-lg leading-6 pb-6 md:leading-8 md:text-[22px]">
          Related Posts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
          {relatedPosts.length > 0 && (
            <Link
              key={post.sys.id}
              href={'/blog/' + post.fields.slug}
              className="flex-1 flex flex-col gap-4 md:gap-6"
            >
              {post.fields.thumbnail && (
                <Image
                  src={`https:${
                    (post.fields.thumbnail as Asset)?.fields.file?.url
                  }`}
                  alt={
                    ((post.fields.thumbnail as Asset).fields.title as string) ||
                    'Thumbnail'
                  }
                  width={400}
                  height={400}
                  className="rounded-md object-cover w-full"
                />
              )}
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex gap-1 md:gap-2 items-center">
                  <ProjectTypes types={post.fields.types as string[]} />
                  <p className="text-[#949494] text-xs md:text-sm">
                    {post.fields.date as string}
                  </p>
                </div>

                <p
                  style={{
                    fontSize: 'clamp(18px, 1.2vw, 22px)',
                    lineHeight: 'clamp(24px, 1.2vw, 32px)',
                  }}
                  className="font-medium"
                >
                  {post.fields.title as string}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between rounded-xl my-[60px] md:mb-10 md:mt-20 bg-transparent md:bg-white ">
        {previousPost && (
          <Link
            href={`/blog/${previousPost.fields.slug}`}
            className="flex gap-3 md:gap-4 justify-start px-3 py-4 md:px-6 md:py-7 bg-white rounded-xl"
          >
            <Image
              src={`https:${
                (previousPost.fields.thumbnail as Asset)?.fields.file?.url
              }`}
              alt={
                (previousPost.fields.thumbnail as Asset)?.fields.title as string
              }
              width={65}
              height={65}
              className="w-[52px] md:w-[65px] aspect-square rounded-lg object-cover"
            />
            <div className="flex flex-col gap-2">
              <span
                className="flex items-center w-fit gap-0.5 rounded-full bg-[#F1F1ED] uppercase px-3.5 py-1.5 font-normal"
                style={{
                  fontSize: 'clamp(10px, 1.2vw, 14px)',
                  lineHeight: 'clamp(14px, 1.2vw, 20px)',
                }}
              >
                Previous
              </span>
              <span className="font-medium text-sm md:text-lg">
                {previousPost.fields.title as string}
              </span>
            </div>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.fields.slug}`}
            className="flex gap-3 md:gap-4 justify-end px-3 py-4 md:px-6 md:py-7 bg-white rounded-xl"
          >
            <div className="flex flex-col gap-2 items-end">
              <span
                className="flex items-center w-fit gap-0.5 rounded-full bg-[#F1F1ED] uppercase px-3.5 py-1.5 font-normal"
                style={{
                  fontSize: 'clamp(10px, 1.2vw, 14px)',
                  lineHeight: 'clamp(14px, 1.2vw, 20px)',
                }}
              >
                Next
              </span>
              <span className="font-medium text-sm md:text-lg">
                {nextPost.fields.title as string}
              </span>
            </div>
            <Image
              src={`https:${
                (nextPost.fields.thumbnail as Asset)?.fields.file?.url
              }`}
              alt={(nextPost.fields.thumbnail as Asset)?.fields.title as string}
              width={65}
              height={65}
              className="rounded-lg w-[52px] md:w-[65px] aspect-square object-cover"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
