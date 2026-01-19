import { CREATE_PAGE_MUTATION } from "../../infrastructure/mutation/mutation";
import { createBlogOrPageType, PageInputType, CreatePageResponseType, PageMetafieldEdgeType } from "../../type/seo/seoType";

export async function createPageUseCase({
  formData, 
  admin, 
  shopName, 
  session
}: createBlogOrPageType): Promise<CreatePageResponseType> {

  const shopUrl = session.shop;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const status = formData.get("status") as string;
  const meta_title = formData.get("meta_title") as string;
  const meta_description = formData.get("meta_description") as string;

  const pageInput: PageInputType = {
    title,
    body,
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
  };

  const response = await admin.graphql(
    CREATE_PAGE_MUTATION, {
      variables: { 
        page: pageInput
      },
    }
  );
  const result = await response.json();

  const page = result?.data?.
    pageCreate?.page;
  const userErrors = result?.data?.
    pageCreate?.userErrors;

  if (!page) {
    throw new Error(
      `pageCreate failed: ${JSON.stringify(userErrors ?? result)}`
    );
  }

  const idPage = page.id.split("/").pop();

  const metafieldsRaw = page.metafields?.edges || [];
  const metafields = metafieldsRaw.reduce((
    acc: Record<string, string>, 
    edge: PageMetafieldEdgeType
    ) => {
      acc[edge.node.key] = 
        edge.node.value;
      return acc;
    }, {}
  );

  return {
    page: { ...page, metafields },
    idPage,
    status,
    shopUrl,
    shopName,
    userErrors,
  };
}
