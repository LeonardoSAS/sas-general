import { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { authenticate } from "app/shopify.server";
import { ProductController } from "app/adapters/controllers/product.controller";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  
  await authenticate.admin(request);
  
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {

  const { admin } = await authenticate.admin(request);
  
  const result = await ProductController({
    admin,
    request
  })

  return result;
};