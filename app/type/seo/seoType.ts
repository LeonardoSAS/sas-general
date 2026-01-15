import { AdminApiContext } from "@shopify/shopify-app-react-router/server";
import type { Session } from "@shopify/shopify-api";
import { ErrorsType } from "../general";

export type createContentType = {
  formData: FormData;
  admin: AdminApiContext;
  shopName: string;
  type: "page" | "blog";
};

export type seoControllerType = {
  formData: FormData;
  admin: AdminApiContext;
  session: Session;
  shopName: string;
};

export type createBlogOrPageType = {
  formData: FormData;
  admin: AdminApiContext;
  shopName: string;
  session: Session;
};

export type fetchHtmlAndUrlType = {
  url: string;
  type: string;
};

export type fetchHtmlUrlPromiseType = {
  html: string; 
  imageUrls: string[]; 
};

export type layoutCleanerType = {
    body: string;
    type: "page" | "blog";
};

export type FieldNameType = keyof ErrorsType;

