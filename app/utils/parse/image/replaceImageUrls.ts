import { replaceImageUrlsType } from "app/type/image/imageType";

export function replaceImageUrls({ 
  html, 
  results 
}: replaceImageUrlsType): string {  
  
  let updatedHtml = html;

  results.forEach(({ 
    oldUrl, 
    newUrl
  }) => {
    if (newUrl) {
      updatedHtml = updatedHtml.split(oldUrl).join(newUrl);
    }
  });

  return updatedHtml;
}