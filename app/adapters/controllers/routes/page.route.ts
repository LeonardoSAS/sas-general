import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { authenticate } from "../../../shopify.server";
import { getThemeTitleUseCase } from "../../../application/theme/getThemeTitle.usecase";
import { extractShopName } from "../../../utils/helpers/shop-name";
import { createPageController } from "../page.controller";

export async function loader({ request }: LoaderFunctionArgs) {

    const { admin } = await authenticate.admin(request);
    const [title] = await Promise.all([
      getThemeTitleUseCase(admin)
    ]); 
    return title
}
  export const action = async ({ request }: ActionFunctionArgs) => {
    
    const { admin, session } = await authenticate.admin(request);
    const shopName = extractShopName(session.shop);
    const formData = await request.formData();
    
    const result = await createPageController({
      formData,
      admin,
      session,
      shopName
    });

    return result;
};