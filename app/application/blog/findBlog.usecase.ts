import { adminFormDataType } from "app/type/general";
import { getShopifyBlogs } from "app/infrastructure/shopify/helpers/blog/blogNameAvailable.adapter";

export async function findBlog({
  admin, 
  formData
}: adminFormDataType) {
  
  const handle = String(
    formData.get("blog_id")
  );
  const blogs = await getShopifyBlogs(admin);
  
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