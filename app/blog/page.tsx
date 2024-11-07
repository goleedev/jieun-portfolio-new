import getBlogPosts from '@/utils/get-blog-posts';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      {posts.map((post) => (
        <div key={post.sys.id}>
          <h2>
            {typeof post.fields.title === 'string'
              ? post.fields.title
              : 'Untitled'}
          </h2>
        </div>
      ))}
    </div>
  );
}
