import type { Asset } from 'contentful';
import Image from 'next/image';
import getBlogPostBySlug from '@/data/get-blog-post';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, MARKS, Node } from '@contentful/rich-text-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
    },
  };

  return (
    <div>
      <h1 className="text-4xl font-bold my-4">{post.fields.title as string}</h1>
      <p className="text-gray-500 mb-4">
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
            width={600}
            height={400}
            className="rounded-lg"
          />
        )}
      </div>
      <div>
        <strong>Types:</strong>
        <ul className="flex gap-2 mt-2">
          {(post.fields.types as string[]).map((type, index) => (
            <li
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded"
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
      <div className="rich-text-content mt-6">
        {post.fields.content &&
          documentToReactComponents(
            post.fields.content as Document,
            renderOptions
          )}
      </div>
    </div>
  );
}
