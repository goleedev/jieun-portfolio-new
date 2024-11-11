import type { Entry } from 'contentful';

import { TypeBlogPostSkeleton } from '@/contentful/types';
import getBlogPosts from '@/data/get-blog-posts';
import Featured from './components/featured';
import Header from './components/header';
import OtherPosts from './components/other-posts';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const blogPosts = posts.items as Entry<TypeBlogPostSkeleton>[];

  const featuredPosts = blogPosts
    .filter((post) => post.fields.isFeatured)
    .slice(0, 2);
  const nonFeaturedPosts = blogPosts.filter((post) => !post.fields.isFeatured);

  return (
    <div>
      <Header />
      <Featured posts={featuredPosts} />
      <OtherPosts posts={nonFeaturedPosts} />
    </div>
  );
}
