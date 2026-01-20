import { createContent } from "../../application/content/createContent.usecase";
import { createBlogUseCase } from "app/domain/blog/createBlog.usecase";
import { processBannerImage } from "app/application/images/processBannerImage.usecase";
import { findBlog } from "app/application/blog/findBlog.usecase";
import { CreateBlogControllerType } from "app/type/seo/seoType";

export async function createBlogController({
  formData, 
  admin, 
  session, 
  shopName,
  cachedBlogs
}: CreateBlogControllerType) {

  const imageUrl = await processBannerImage({
    admin, 
    formData
  });

  if (imageUrl){
    formData.set("image_banner", imageUrl);
  }

  const blogInfo = await findBlog({
    admin, 
    formData,
    cachedBlogs
  });
  
  formData.set("blog_id", blogInfo.id);
  formData.set("blog_handle", blogInfo.handle);

  const content = await createContent({
    formData,
    admin,
    shopName,
    type: "blog",
  });
  
  return await createBlogUseCase({
    formData: content,
    admin,
    shopName,
    session,
  });
}