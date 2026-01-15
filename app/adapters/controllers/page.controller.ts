import { createPageUseCase } from "app/domain/pages/createPage.usecase";
import { createContent } from "../../application/content/createContent.usecase";
import { seoControllerType } from "app/type/seo/seoType";

export async function createPageController({
  formData, 
  admin, 
  session, 
  shopName
}: seoControllerType){
  
  const content = await createContent({
    formData,
    admin,
    shopName,
    type: "page",
  });

  return await createPageUseCase({
    formData: content,
    admin,
    shopName,
    session
  });
}