import { MetafieldType } from "app/type/product/metafield/metafield";

export function mapMetafields(
    metafields: MetafieldType[]
) {
    
  return metafields.map((mf) => ({
    namespace: mf.namespace,
    key: mf.key,
    value: Array.isArray(mf.value) ? JSON.stringify(mf.value) : mf.value,
    type: mf.type
  }));
}
