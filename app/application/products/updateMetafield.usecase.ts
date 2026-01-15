import { UpdateMetafieldsType, UpdateMetafieldsResultType } from "app/type/product/metafield/metafield";
import { getProductInfoBySku } from "app/infrastructure/product/getProductInfo.adapter";
import { processProductMetafields } from "app/infrastructure/product/metafield/processProductMetafields.adapter";
import { processVariantMetafields } from "app/infrastructure/product/metafield/processVariantMetafields.adapter";
import { processPriceUpdate } from "./csv/processPrice";
import { metafieldData } from "app/domain/products/metafield/metafield.usecase";

export async function updateMetafields({
  admin, 
  data,
}: UpdateMetafieldsType): Promise<UpdateMetafieldsResultType[]> {
  
  const results: UpdateMetafieldsResultType[] = [];

  for (const { 
      sku, 
      metafields
    } of data) {
    
    try {
      const productInfo = await getProductInfoBySku({
        admin, sku
      });

      if (!productInfo) {
        results.push({ 
          sku, 
          success: false, 
          error: `Product with SKU ${sku} not found`
        });
        
        continue;
      }

      const separated = metafieldData(metafields);
      const skuResults: UpdateMetafieldsResultType[] = [];

      await processProductMetafields({ 
        admin, 
        productInfo, 
        sku, 
        productMetafields: separated.productMetafields, 
        results: skuResults
      });
      await processVariantMetafields({ 
        admin, 
        productInfo, 
        sku, 
        variantMetafields: separated.variantMetafields, 
        results: skuResults
      });
      await processPriceUpdate({ 
        admin, 
        productInfo, 
        sku, 
        priceUpdate: separated.priceUpdate, 
        results: skuResults
      });
      
      const allSuccess = skuResults.every(
        r => r.success
      );
      const allErrors = skuResults.flatMap(
        r => r.errors || []
      );

      const localProductFields = separated.productMetafields.map(mf => ({
        namespace: mf.namespace,
        key: mf.key,
        value: Array.isArray(mf.value) ? 
          JSON.stringify(mf.value) : String(mf.value)
      }));
      const localVariantFields = separated.variantMetafields.map(mf => ({
        namespace: mf.namespace,
        key: mf.key,
        value: Array.isArray(mf.value) ? 
          JSON.stringify(mf.value) : String(mf.value)
      }));
      const localPriceFields = separated.priceUpdate ? [{
        namespace: separated.priceUpdate.namespace,
        key: separated.priceUpdate.key,
        value: String(separated.priceUpdate.value)
      }] : [];
      
      const updates = {
        product: localProductFields.length > 0 ? localProductFields : undefined,
        variant: localVariantFields.length > 0 ? localVariantFields : undefined,
        price: localPriceFields.length > 0 ? localPriceFields : undefined
      };
      
      results.push({ 
        sku, 
        success: allSuccess, 
        errors: allErrors.length > 0 ? allErrors : undefined,
        product: skuResults.find(r => r.product)?.product,
        updates
      });
    } 
    catch (error: any) {
      results.push({ 
        sku, 
        success: false, 
        error: error.message
      });
    }
  }

  return results;
}