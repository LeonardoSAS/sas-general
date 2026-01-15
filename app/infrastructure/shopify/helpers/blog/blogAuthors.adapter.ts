import { GET_AUTHORS_QUERY } from "../../../query/query";
import { adminType } from "app/type/general";

export async function getShopifyAuthors(
  admin: adminType
) {

  const response = await admin.graphql(
    GET_AUTHORS_QUERY
  );
  const data = await response.json();

  const authors = data.data.articles.nodes;
  
  return Array.from(
    new Set(
      authors.map((item: any) => 
        item.author?.name)
          .filter(Boolean))
  );
}