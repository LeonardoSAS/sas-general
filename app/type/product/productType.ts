import { AdminApiContext } from "@shopify/shopify-app-react-router/server";
import { ProcessingErrorType } from "../general";
import { MetafieldDataType, MetafieldType } from "./metafield/metafield";

export type productSkuType = {
  sku: string;
  admin: AdminApiContext;
}

export interface ProductInfoType {
  productId: string;
  variantId: string | null;
}

export interface CSVProcessingResultType {
  data: MetafieldDataType[];
  errors: ProcessingErrorType[];
  summary: {
    totalLines: number;
    processedLines: number;
    linesWithErrors: number;
  };
}

export type FetchCsvResultType = {
  success: boolean;
  fileContent: string;
};

export type ProcessCellType = {
  header: string;
  value: string | undefined;
  sku: string;
  lineNumber: number;
  processingErrors: ProcessingErrorType[];
  lineProcessingErrors: ProcessingErrorType[];
  lineErrors: string[];
};

export type ProcessCellResultType = {
  metafield?: MetafieldType;
  hasErrors: boolean;
};

export type ProductControllerType = {
  admin: any;
  request: Request;
};

export type ActionResponseType = {
  success: boolean;
  message: string;
  results?: any[];
};


export interface CSVFileUploaderPropsType {
  onSubmit: (file: File) => void;
  isProcessing: boolean;
}

export interface ResultsDisplayPropsType {
  data: {
    success: boolean;
    message: string;
    results?: any[];
  } | null;
}

export type parseHeaderMetadataType = {
  header: string;
  sku: string;
  lineNumber: number;
  processingErrors: ProcessingErrorType[];
  lineProcessingErrors: ProcessingErrorType[];
  lineErrors: string[];
}

export type pushHeaderErrorType = {
  sku: string;
  header: string;
  lineNumber: number;
  message: string;
  processingErrors: ProcessingErrorType[];
  lineProcessingErrors: ProcessingErrorType[];
  lineErrors: string[];
}

export type ParsedHeaderMetadataType = {
  target: 'product' | 'variant';
  namespace: string;
  key: string;
  types: MetafieldType['type'][];
  isPriceField: boolean;
};