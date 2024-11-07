import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

const getBlogPosts = async () => {
  const response = await client.getEntries({
    content_type: 'blogPost',
  });

  return response.items;
};

export default getBlogPosts;
