import { MetafieldType } from "app/type/product/metafield/metafield";

export function metafieldData(
  metafields: MetafieldType[]
) {
  const productMetafields = 
    metafields.filter((mf) =>
      mf.target === "product"
    );
  
  const priceUpdate = 
    metafields.find((mf) => 
      mf.namespace === "" && mf.key === "price"
    );
  
  const variantMetafields = 
    metafields.filter((mf) =>
      mf.target === "variant" && 
      !(mf.namespace === "" && mf.key === "price")
    );

  return { 
    productMetafields, 
    variantMetafields, 
    priceUpdate
  };
}