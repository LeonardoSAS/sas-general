import { getShopifyBlogs } from "app/infrastructure/shopify/helpers/blog/blogNameAvailable.adapter";
import { FindBlogValue } from "app/type/interface/seo/interface";

export async function findBlog({
  admin, 
  formData,
  cachedBlogs
}: FindBlogValue) {
  
  const handle = String(
    formData.get("blog_id")
  );
  
  let blogs = cachedBlogs;
  
  if (!blogs) {
    blogs = await getShopifyBlogs(admin);
  }
  
  const selected = blogs.find(
    b => b.handle === handle
  );

  if (!selected){
    throw new Error(
      `Blog '${handle}' not found`
    );
  }

  return selected;
}