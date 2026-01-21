import { seoControllerType, BlogLoaderType } from "../../seo/seoType";
import { adminFormDataType } from "../../general";

export interface CreateBlogControllerType extends seoControllerType {
  cachedBlogs?: BlogLoaderType[];
}

export interface FindBlogValue extends adminFormDataType {
  cachedBlogs?: BlogLoaderType[];
}