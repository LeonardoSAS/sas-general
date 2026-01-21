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

export type BlogLoaderType = {
  id: string;
  handle: string;
  title: string;
};

export type CreateArticleResponseType = {
  blog: ArticleGraphQlType & { metafields: Record<string, string> };
  idBlog: string;
  blogHandle: string;
  blogName: string;
  status: string;
  shopUrl: string;
  shopName: string;
  userErrors: ShopifyUserErrorType[] | null;
};

export type metafieldSeoType = {
  namespace: string;
  key: string;
  value: string;
  type: string;
};

export type ArticleInputType = {
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
};

export type ArticleMetafieldEdgeType = {
  node: {
    key: string;
    value: string;
  };
};

export type ArticleGraphQlType = {
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
};

export type PageInputType = {
  title: string;
  body: string;
  isPublished: boolean;
  metafields: metafieldSeoType[];
};

export type PageMetafieldEdgeType = {
  node: {
    key: string;
    value: string;
  };
};

export type PageGraphQlType = {
  id: string;
  title: string;
  body: string;
  metafields?: {
    edges: PageMetafieldEdgeType[];
  };
  [key: string]: unknown;
};

export type CreatePageResponseType = {
  page: PageGraphQlType & { metafields: Record<string, string> };
  idPage: string;
  status: string;
  shopUrl: string;
  shopName: string;
  userErrors: ShopifyUserErrorType[] | null;
};
export type AuthorGraphQlType = {
  author?: {
    name: string;
  };
};

export type GetAuthorsResponseType = {
  data: {
    articles: {
      nodes: AuthorGraphQlType[];
    };
  };
};

export type GetBlogsResponseType = {
  data: {
    blogs: {
      edges: {
        node: BlogLoaderType;
      }[];
    };
  };
};

export type FieldNameType = keyof ErrorsType;