import { adminFormDataType } from "app/type/general";
import { getShopifyBlogs } from "app/infrastructure/shopify/helpers/blog/blogNameAvailable.adapter";
import { BlogNodeType } from "app/type/seo/seoType";

interface FindBlogParams extends adminFormDataType {
  cachedBlogs?: BlogNodeType[];
}

export async function findBlog({
  admin, 
  formData,
  cachedBlogs
}: FindBlogParams) {
  
  const handle = String(
    formData.get("blog_id")
  );
  
  // Se blogs estão em cache, reutiliza
  let blogs = cachedBlogs;
  
  // Fallback: busca blogs se não estiverem cacheados
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