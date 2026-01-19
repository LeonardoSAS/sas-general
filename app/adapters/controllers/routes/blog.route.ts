import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { getThemeTitleUseCase } from "../../../application/theme/getThemeTitle.usecase";
import { authenticate } from "../../../shopify.server";
import { extractShopName } from "../../../utils/helpers/shop-name";
import { getShopifyAuthors } from "../../../infrastructure/shopify/helpers/blog/blogAuthors.adapter"
import { getShopifyBlogs } from "../../../infrastructure/shopify/helpers/blog/blogNameAvailable.adapter";
import { createBlogController } from "../blog.controller";

export async function loader({ request }: LoaderFunctionArgs){

  const { admin } = await authenticate.admin(request);
  
  const [trueauthors, title, blogs] = await Promise.all([
    getShopifyAuthors(admin),
    getThemeTitleUseCase(admin),
    getShopifyBlogs(admin)
  ]);

  return { 
    authors: trueauthors, 
    title,
    blogs,
  }
}

export async function action ({ request }: ActionFunctionArgs){
  
  const { admin, session } = await authenticate.admin(request);
  const shopName = extractShopName(session.shop);
  const formData = await request.formData();
  
  const result = await createBlogController({
    formData, 
    admin, 
    session, 
    shopName
  });

  return result;
}