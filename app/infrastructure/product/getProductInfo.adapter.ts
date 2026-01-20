import { productSkuType, ProductInfoType, ProductVariantEdgeType } from "app/type/product/productType";
import { GET_PRODUCT_BY_SKU_QUERY } from "app/infrastructure/query/query";

export async function getProductInfoBySku({
  sku,
  admin
}: productSkuType): Promise<ProductInfoType | null> {
  
  try {
    const response = await admin.graphql(
      GET_PRODUCT_BY_SKU_QUERY, {
        variables: { 
          query: `sku:"${sku}"` 
        },
      }
    );
    const json = await response.json();
    
    const product = json.data?.
      products?.edges?.[0]?.node;
    
    if (!product){
      return null;
    }

    const variantId = product.variants?.
      edges?.find((
        edge: ProductVariantEdgeType
      ) => edge.node.sku === sku)?.
        node?.id ?? null;

    return { 
      productId: product.id, 
      variantId
    };
  } 
  catch (error) {
    console.error(`Error searching for product with SKU ${sku}:`, error);
    
    return null;
  }
}