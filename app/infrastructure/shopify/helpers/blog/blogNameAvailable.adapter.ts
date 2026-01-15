import { GET_BLOGS_NAME_QUERY } from "../../../../infrastructure/query/query";

export async function getShopifyBlogs(
  admin: any
) {
  
  const response = await admin.graphql(
    GET_BLOGS_NAME_QUERY
  );
  const data = await response.json() as {
    data: {
      blogs: {
        edges: {
          node: any 
        }[]
      }
    };
  };
  const blogs = data.data.blogs.edges.map(e => ({
    id: e.node.id,
    handle: e.node.handle,
    title: e.node.title,
  }));

  return blogs;
}
