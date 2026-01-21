import { AdminApiContext } from "@shopify/shopify-app-react-router/server";

export type adminFormDataType = {
  admin: AdminApiContext;
  formData: FormData;
};

export type ErrorsType = { 
  title: string; 
  url: string
};

export type ProcessingErrorType = {
  sku: string;
  header?: string;
  message: string;
  line: number;
};

export type ShopifyUserErrorType = {
  field?: string[];
  message: string;
};

export type datetimeType = {
  shopName: string;
  sequenceNumber: number;
};

export type adminType = AdminApiContext;