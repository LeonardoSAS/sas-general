import { AdminApiContext } from "@shopify/shopify-app-react-router/server";

export type processImageType = {
  url: string;
  admin: AdminApiContext;
  shopName: string;
  type: string;
};

export type UploadImagesResultItemType = {
  oldUrl: string;
  newUrl?: string;
};

export type UploadImagesInputType = {
  imageUrls: string[];
  admin: any;
  shopName: string;
};

export type uploadWebpToShopifyType = {
  admin: any;
  buffer: Buffer;
  filename: string;
};

export type replaceImageUrlsType = {
  html: string;
  results: {
    oldUrl: string;
    newUrl?: string;
  }[];
};