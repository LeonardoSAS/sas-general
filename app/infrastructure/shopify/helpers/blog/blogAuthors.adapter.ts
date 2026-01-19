import { GET_AUTHORS_QUERY } from "../../../query/query";
import { adminType } from "app/type/general";
import { ArticleBlogNodeType } from "app/type/seo/seoType";

export async function getShopifyAuthors(
  admin: adminType
) {

  const response = await admin.graphql(
    GET_AUTHORS_QUERY
  );
  const data = await response.json() as {
    data: {
      articles: {
        nodes: ArticleBlogNodeType[];
      };
    };
  };

  const authors = data.data.articles.nodes;
  
  return Array.from(
    new Set(
      authors.map((item: ArticleBlogNodeType) => 
        item.author?.name)
          .filter(Boolean))
  );
}