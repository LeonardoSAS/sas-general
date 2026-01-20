import { AdminApiContext } from "@shopify/shopify-app-react-router/server";
import type { Session } from "@shopify/shopify-api";
import { ErrorsType, ShopifyUserErrorType } from "../general";

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

export interface CreateBlogControllerType extends seoControllerType {
  cachedBlogs?: BlogLoaderType[];
}

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

export interface BlogLoaderType {
  id: string;
  handle: string;
  title: string;
}

export interface CreateArticleResponseType {
  blog: ArticleGraphQlType & { metafields: Record<string, string> };
  idBlog: string;
  blogHandle: string;
  blogName: string;
  status: string;
  shopUrl: string;
  shopName: string;
  userErrors: ShopifyUserErrorType[] | null;
}

export interface metafieldSeoType {
  namespace: string;
  key: string;
  value: string;
  type: string;
}

export interface ArticleInputType {
  blogId: string;
  title: string;
  body: string;
  author: {
    name: string;
  };
  isPublished: boolean;
  metafields: metafieldSeoType[];
  image: {
    url: string | null;
  };
}

export interface ArticleMetafieldEdgeType {
  node: {
    key: string;
    value: string;
  };
}

export interface ArticleGraphQlType {
  id: string;
  title: string;
  body: string;
  author?: {
    name: string;
  };
  image?: {
    url: string | null;
  };
  metafields?: {
    edges: ArticleMetafieldEdgeType[];
  };
  [key: string]: unknown;
}

export interface PageInputType {
  title: string;
  body: string;
  isPublished: boolean;
  metafields: metafieldSeoType[];
}

export interface PageMetafieldEdgeType {
  node: {
    key: string;
    value: string;
  };
}

export interface PageGraphQlType {
  id: string;
  title: string;
  body: string;
  metafields?: {
    edges: PageMetafieldEdgeType[];
  };
  [key: string]: unknown;
}

export interface CreatePageResponseType {
  page: PageGraphQlType & { metafields: Record<string, string> };
  idPage: string;
  status: string;
  shopUrl: string;
  shopName: string;
  userErrors: ShopifyUserErrorType[] | null;
}

export type FieldNameType = keyof ErrorsType;