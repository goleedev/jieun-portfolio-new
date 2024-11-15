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
    <>
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
                fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 1rem)',
                lineHeight: 'clamp(1rem, 1.5vw + 0.25rem, 1.25rem)',
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
          <div className="rich-text-content max-w-[720px] w-full mx-auto pt-[60px] md:pt-20">
            {post.fields.content &&
              documentToReactComponents(
                post.fields.content as Document,
                renderOptions
              )}
          </div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="max-w-[720px] w-full mx-auto pt-10">
          <h3 className="text-2xl font-semibold mb-4">Related Projects</h3>
          <ul className="space-y-4">
            {relatedPosts.map((relatedPost) => (
              <li key={relatedPost.sys.id} className="border p-4 rounded-lg">
                <h4 className="text-xl font-semibold">
                  {relatedPost.fields.title as string}
                </h4>
                <p>{relatedPost.fields.description as string}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="max-w-[720px] w-full mx-auto pt-10 flex justify-between">
        {previousPost && (
          <Link href={`/blog/${previousPost.fields.slug}`}>
            <span className="text-blue-500 hover:underline">
              ← {previousPost.fields.title as string}
            </span>
          </Link>
        )}
        {nextPost && (
          <Link href={`/blog/${nextPost.fields.slug}`}>
            <span className="text-blue-500 hover:underline">
              {nextPost.fields.title as string} →
            </span>
          </Link>
        )}
      </div>
    </>
  );
}
