
import { ProcessProductMetafieldsType} from 'app/type/product/metafield/metafield';
import { UPDATE_PRODUCT_MUTATION } from 'app/infrastructure/mutation/mutation';
import { mapMetafields } from 'app/infrastructure/product/map/mapMetafield';

export async function processProductMetafields({
  admin,
  productInfo,
  sku,
  productMetafields,
  results
}: ProcessProductMetafieldsType) {

  if (!productMetafields.length){
    return;
  }

  const metafieldInputs = mapMetafields(
    productMetafields
  );
  const response = await admin.graphql(
    UPDATE_PRODUCT_MUTATION, {
      variables: {
        product: {
          id: productInfo.productId,
          metafields: metafieldInputs
        }
      }
    }
  );
  const responseJson = await response.json();

  results.push({
    sku,
    success: !responseJson.data?.
      productUpdate?.userErrors?.length,
    errors: responseJson.data?.
      productUpdate?.userErrors || [],
    product: responseJson.data?.
      productUpdate?.product
  });
}
