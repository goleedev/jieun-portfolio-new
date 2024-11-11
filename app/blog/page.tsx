import type { Entry } from 'contentful';

import { TypeBlogPostSkeleton } from '@/contentful/types';
import getBlogPosts from '@/data/get-blog-posts';
import BlogPageContent from './components/blog-content';
import Featured from './components/featured';
import Header from './components/header';

function groupByCategory(posts: Entry<TypeBlogPostSkeleton>[]) {
  return posts.reduce(
    (acc, post) => {
      const category = post.fields.category as string;

      acc['All'].push(post);

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(post);

      return acc;
    },
    { All: [] } as Record<string, Entry<TypeBlogPostSkeleton>[]>
  );
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const blogPosts = posts.items as Entry<TypeBlogPostSkeleton>[];

  const featuredPosts = blogPosts
    .filter((post) => post.fields.isFeatured)
    .slice(0, 2);
  const nonFeaturedPosts = blogPosts.filter((post) => !post.fields.isFeatured);

  const groupedNonFeaturedPosts = groupByCategory(nonFeaturedPosts);

  return (
    <div>
      <Header />
      <Featured posts={featuredPosts} />
      <BlogPageContent groupedNonFeaturedPosts={groupedNonFeaturedPosts} />
    </div>
  );
}
