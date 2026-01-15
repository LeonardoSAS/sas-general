import { UpdateMetafieldsResultType } from "app/type/product/metafield/metafield";
import { UpdateVariantPriceType } from "app/type/product/price/price";
import { UPDATE_PRODUCT_VARIANTS_MUTATION } from "app/infrastructure/mutation/mutation";

export async function updateVariantPrice({
  admin, 
  productId, 
  variantId, 
  price
}: UpdateVariantPriceType): Promise<Pick<UpdateMetafieldsResultType,
  "success" | "errors" | "product">> {

  const response = await admin.graphql(
    UPDATE_PRODUCT_VARIANTS_MUTATION, {
      variables: {
        productId,
        variants: [
          {
            id: variantId,
            price,
          },
        ],
      },
    }
  );
  const json = await response.json();
  
  const userErrors = json.data?.
    productVariantsBulkUpdate?.userErrors || [];

  return {
    success: !userErrors.length,
    errors: userErrors,
    product: json.data?.
      productVariantsBulkUpdate?.productVariants?.[0],
  };
}
