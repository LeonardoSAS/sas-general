import { AdminApiContext } from "@shopify/shopify-app-react-router/server";
import { adminType } from "../general";

export type ImageBannerEventType = {
  currentTarget?: { files?: FileList };
  target?: { files?: FileList };
  dataTransfer?: DataTransfer;
  detail?: { files?: FileList };
};

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
  admin: adminType;
  shopName: string;
};

export type uploadWebpToShopifyType = {
  admin: adminType;
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

export type StagedUploadParameterType = {
  name: string;
  value: string;
};