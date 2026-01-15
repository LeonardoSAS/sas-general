import { fetchHtml } from "../../infrastructure/http/fetchHtml.adapter";
import { extractImageUrlsFromDoc } from "../../utils/parse/extract/extract-urlDoc";
import { extractImageUrlsFromMailchimp } from "../../utils/parse/extract/extract-urlMailchimp";
import { fetchHtmlAndUrlType, fetchHtmlUrlPromiseType } from "../../type/seo/seoType";

export async function fetchHtmlAndUrl({
  url, 
  type
}: fetchHtmlAndUrlType): Promise<fetchHtmlUrlPromiseType> {
  
  const html = await fetchHtml(url);

  let imageUrls: string[] = [];
  
  if (type === "blog"){
    imageUrls = extractImageUrlsFromDoc(html);
  }
  else{
    imageUrls = extractImageUrlsFromMailchimp(html);
  }
  
  return { 
    html, 
    imageUrls
  };
}