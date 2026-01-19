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

export interface BlogNodeType {
  id: string;
  handle: string;
  title: string;
}

export interface ArticleBlogNodeType {
  author?: {
    name: string;
  };
}

export interface CreateArticleResponseType {
  blog: Record<string, any>;
  idBlog: string;
  blogHandle: string;
  status: string;
  shopUrl: string;
  shopName: string;
  userErrors: Array<{ field: string; message: string }> | null;
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

export interface CreatePageResponseType {
  page: Record<string, any>;
  idPage: string;
  status: string;
  shopUrl: string;
  shopName: string;
  userErrors: Array<{ 
    field: string; 
    message: string 
  }> | null;
}

export type FieldNameType = keyof ErrorsType;

