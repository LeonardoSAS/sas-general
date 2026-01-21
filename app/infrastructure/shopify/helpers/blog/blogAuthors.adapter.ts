import { GET_AUTHORS_QUERY } from "../../../query/query";
import { adminType } from "app/type/general";
import { GetAuthorsResponseType, AuthorGraphQlType } from "app/type/seo/seoType";

export async function getShopifyAuthors(
  admin: adminType
): Promise<string[]> {

  const response = await admin.graphql(
    GET_AUTHORS_QUERY
  );
  const data = await 
    response.json() as GetAuthorsResponseType;

  const authors = data.data.
    articles.nodes;
  
  return Array.from(
    new Set(
      authors.map((item: AuthorGraphQlType) => 
        item.author?.name).filter((name): 
          name is string => Boolean(name)))
  );
}