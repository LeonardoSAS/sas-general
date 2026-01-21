import { GET_BLOGS_NAME_QUERY } from "../../../../infrastructure/query/query";
import { adminType } from "app/type/general";
import type { BlogLoaderType, GetBlogsResponseType } from "app/type/seo/seoType";

export async function getShopifyBlogs(
  admin: adminType
): Promise<BlogLoaderType[]> {
  
  const response = await admin.graphql(
    GET_BLOGS_NAME_QUERY
  );
  const data = await response.json() as GetBlogsResponseType;

  const blogs = data.data.blogs.edges.map(e => ({
    id: e.node.id,
    handle: e.node.handle,
    title: e.node.title,
  }));

  return blogs;
}