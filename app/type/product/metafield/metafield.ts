import { ProcessingErrorType } from "../../general";
import { AdminApiContext } from "@shopify/shopify-app-react-router/server";

export interface MetafieldType {
  namespace: string;
  key: string;
  value: string | string[];
  type: 'single_line_text_field' | 'multi_line_text_field' | 'number_integer' | 'number_decimal' | 'boolean' | 'date' | 'date_time' | 'json' | 'rating' | 'color' | 'weight' | 'volume' | 'dimension' | 'url' | 'file_reference' | 'product_reference' | 'variant_reference' | 'page_reference' | 'collection_reference' | 'customer_reference' | 'order_reference' | 'list.single_line_text_field';
  target: 'product' | 'variant';
}

export interface MetafieldDataType {
  sku: string;
  metafields: MetafieldType[];
  warnings?: string[];
  errors?: string[];
  processingErrors?: ProcessingErrorType[];
  processingSummary?: {
    totalLines: number;
    processedLines: number;
    linesWithErrors: number;
  };
}

export interface UpdateMetafieldsResultType {
  sku: string;
  success: boolean;
  errors?: any[];
  error?: string;
  product?: any;
  updates?: {
    product?: Array<{
      namespace: string;
      key: string;
      value: string;
    }>;
    variant?: Array<{
      namespace: string;
      key: string;
      value: string;
    }>;
    price?: Array<{
      namespace: string;
      key: string;
      value: string;
    }>;
  };
}

export const validTypes: MetafieldType['type'][] = [
  'single_line_text_field',
  'multi_line_text_field',
  'number_integer',
  'number_decimal',
  'boolean',
  'date',
  'date_time',
  'json',
  'rating',
  'color',
  'weight',
  'volume',
  'dimension',
  'url',
  'file_reference',
  'product_reference',
  'variant_reference',
  'page_reference',
  'collection_reference',
  'customer_reference',
  'order_reference',
  'list.single_line_text_field'
];

export type ProcessVariantMetafieldsType = {
  admin: any;
  productInfo: { variantId: string | null };
  sku: string;
  variantMetafields: MetafieldType[];
  results: UpdateMetafieldsResultType[];
};

export type ProcessProductMetafieldsType = {
  admin: any;
  productInfo: { productId: string };
  sku: string;
  productMetafields: MetafieldType[];
  results: UpdateMetafieldsResultType[];
};

export type UpdateMetafieldsType = {
  admin: AdminApiContext,
  data: MetafieldDataType[]
}

export type MetafieldsFromLineType = {
  headers: string[];
  values: string[];
  lineNumber: number;
  processingErrors: ProcessingErrorType[];
};
