import { adminType } from "app/type/general";
import { MetafieldType, UpdateMetafieldsResultType } from "../metafield/metafield";

export type ProcessPriceUpdateType = {
  admin: adminType;
  productInfo: { productId: string; variantId: string | null };
  sku: string;
  priceUpdate?: MetafieldType;
  results: UpdateMetafieldsResultType[];
};

export type UpdateVariantPriceType = {
  admin: adminType;
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
