import { CREATE_BLOG_MUTATION } from "../../infrastructure/mutation/mutation";
import { createBlogOrPageType, ArticleInputType, CreateArticleResponseType, ArticleMetafieldEdgeType } from "../../type/seo/seoType";

export async function createBlogUseCase({
  formData, 
  admin, 
  shopName, 
  session
}: createBlogOrPageType): Promise<CreateArticleResponseType> {
  
  const shopUrl = session.shop;
  const blogId = String(formData.get("blog_id"));
  const blogHandle = String(formData.get("blog_handle"));
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const authorName = formData.get("author") as string;
  const status = formData.get("status") as string;
  const meta_title = formData.get("meta_title") as string;
  const meta_description = formData.get("meta_description") as string;
  const banner = formData.get("image_banner");
  const banner_url = typeof banner === "string" ? banner : null;
  
  const articleInput: ArticleInputType = {
    blogId,
    title,
    body,
    author: { 
      name: authorName
    },
    isPublished: status === "publish",
    metafields: [
      {
        namespace: "global",
        key: "title_tag",
        value: meta_title || "",
        type: "single_line_text_field",
      },
      {
        namespace: "global",
        key: "description_tag",
        value: meta_description || "",
        type: "multi_line_text_field",
      },
    ],
    image: { 
      url: banner_url
    }
  };
 
  const response = await admin.graphql(
    CREATE_BLOG_MUTATION, {
      variables: { 
        article: articleInput
      },
    }
  );
  const result = await response.json();

  const article = result?.data?.
    articleCreate?.article;
  const userErrors = result?.data?.
    articleCreate?.userErrors;

  if (!article) {
    throw new Error(
      `articleCreate failed: ${JSON.stringify(userErrors ?? result)}`
    );
  }
  const articleId = article.id.split("/").pop();

  const metafieldsRaw = article.metafields?.edges || [];
  const metafields = metafieldsRaw.reduce((
    acc: Record<string, string>, 
    edge: ArticleMetafieldEdgeType
    ) => { 
      acc[edge.node.key] = 
        edge.node.value; 
      return acc; 
    }, {}
  );

  return {
    blog: { ...article, metafields },
    idBlog: articleId,
    blogHandle,
    status,
    shopUrl,
    shopName,
    userErrors,
  };
}
