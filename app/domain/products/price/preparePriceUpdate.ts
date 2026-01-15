import { PreparePriceUpdateType, PreparedPriceUpdateType } from "app/type/product/price/price";
import { parsePriceValue } from "app/domain/products/price/parsePriceValue";

export function preparePriceUpdate({
  sku, 
  productInfo, 
  priceUpdate 
}: PreparePriceUpdateType): PreparedPriceUpdateType {

  if (!priceUpdate) {
    return { 
      ok: false, 
      error: "No price update provided"
    };
  }
  if (!productInfo.variantId) {
    return { 
      ok: false, 
      error: `Cannot update price: Variant with SKU ${sku} not found` 
    };
  }

  const priceValue = parsePriceValue(
    priceUpdate.value
  );
  
  if (Number.isNaN(priceValue)){
    return { 
      ok: false, 
      error: `Invalid price value: ${priceUpdate.value}` 
    };
  }

  return { 
    ok: true, 
    variantId: productInfo.variantId, 
    price: priceValue.toString()
  };
}