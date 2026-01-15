import { uploadImages } from "../images/uploadImages.usecase";
import { convertToHtmlExportUrl } from "../../utils/parse/extract/extract-idDoc";
import { createContentType } from "../../type/seo/seoType";
import { layoutCleaner } from "../layout/layoutCleaner.usecase";

export async function createContent({
  formData,
  admin,
  shopName,
  type
}: createContentType): Promise<FormData> {
  
  const rawUrl = formData.get("url");
  const formUrl =
    typeof rawUrl === "string"
      ? rawUrl.trim()
      : "";
  const url =
    type === "blog"
      ? convertToHtmlExportUrl(formUrl)
      : formUrl;
  
  let body = "";
  
  try {
    body = await uploadImages({
      url, 
      admin, 
      shopName, 
      type
    });
  } catch (err) {
    body = "";
  }

  const contentCleaner = layoutCleaner({
    body, 
    type 
  });
  const bodyContent = new FormData();
  
  for (const [key, value] of formData.entries()) {
    if (key !== "body") 
      bodyContent.append(
        key, value
      );
  }
  
  bodyContent.append("body", contentCleaner);
  
  return bodyContent;
}