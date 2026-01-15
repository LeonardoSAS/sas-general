
import { ProcessPriceUpdateType } from "app/type/product/price/price";
import { preparePriceUpdate } from "app/domain/products/price/preparePriceUpdate";
import { updateVariantPrice } from "app/infrastructure/product/price/updateVariantPrice.adapter";

export async function processPriceUpdate({
  admin, 
  productInfo, 
  sku, 
  priceUpdate, 
  results
}: ProcessPriceUpdateType
) {

  const prepared = preparePriceUpdate({ 
    sku, 
    productInfo, 
    priceUpdate 
  });
  
  if (!prepared.ok) {
    if (priceUpdate) {
      results.push({ 
        sku, 
        success: false, 
        error: prepared.error 
      });
    }
    return;
  }

  const infraResult = await updateVariantPrice({
    admin,
    productId: productInfo.productId,
    variantId: prepared.variantId,
    price: prepared.price,
  });

  results.push({
    sku,
    success: infraResult.success,
    errors: infraResult.errors,
    product: infraResult.product,
  });
}