import { ProcessVariantMetafieldsType } from 'app/type/product/metafield/metafield';
import { UPDATE_METAFIELD_MUTATION } from 'app/infrastructure/mutation/mutation';
import { mapMetafields } from 'app/infrastructure/product/map/mapMetafield';

export async function processVariantMetafields({
  admin,
  productInfo,
  sku,
  variantMetafields,
  results 
}: ProcessVariantMetafieldsType) {

  if (!variantMetafields.length){
    return;
  }

  if (!productInfo.variantId) {
    results.push({
      sku,
      success: false,
      error: `Variant with SKU ${sku} not found`
    });
    return;
  }

  const metafieldInputs = mapMetafields(
    variantMetafields).map(input => ({
      ...input,
      ownerId: productInfo.variantId
      }
    ));
    
  const response = await admin.graphql(
    UPDATE_METAFIELD_MUTATION, {
      variables: {
        metafields: metafieldInputs
      }
    }
  );
  const responseJson = await response.json();

  results.push({
    sku,
    success: !responseJson.data?.
      metafieldsSet?.userErrors?.length,
    errors: responseJson.data?.
      metafieldsSet?.userErrors || [],
    product: responseJson.data?.
      metafieldsSet?.metafields
  });
}