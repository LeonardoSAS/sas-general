import { GET_BLOGS_NAME_QUERY } from "../../../../infrastructure/query/query";
import { adminType } from "app/type/general";
import { BlogNodeType } from "app/type/seo/seoType";

export async function getShopifyBlogs(
  admin: adminType
) {
  
  const response = await admin.graphql(
    GET_BLOGS_NAME_QUERY
  );
  const data = await response.json() as {
    data: {
      blogs: {
        edges: {
          node: BlogNodeType 
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
