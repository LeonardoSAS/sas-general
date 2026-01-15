import { MetafieldType, UpdateMetafieldsResultType } from "../metafield/metafield";

export type ProcessPriceUpdateType = {
  admin: any;
  productInfo: { productId: string; variantId: string | null };
  sku: string;
  priceUpdate?: MetafieldType;
  results: UpdateMetafieldsResultType[];
};

export type UpdateVariantPriceType = {
  admin: any;
  productId: string;
  variantId: string;
  price: string;
};

export type PreparedPriceUpdateType =
  | { ok: true; variantId: string; price: string }
  | { ok: false; error: string };

export type PreparePriceUpdateType = {
  sku: string;
  productInfo: { 
    productId: string; 
    variantId: string | null 
  };
  priceUpdate?: MetafieldType;
};

export type PriceValueInputType = string | number | Array<string | number>;
