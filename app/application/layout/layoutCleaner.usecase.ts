import { pageCleaner } from "../../utils/parse/layout/layout-mailchimp";
import { blogCleaner } from "../../utils/parse/layout/layout-doc";
import { layoutCleanerType } from "../../type/seo/seoType";

export function layoutCleaner({ 
  body, 
  type
}: layoutCleanerType): string {
  
  if (type === "page"){
    body = pageCleaner(body);
  }
  else if (type === "blog"){
    body = blogCleaner(body);
  }
  else{
    body = "";
  }

  return body;
}