import { fetchHtmlAndUrl } from "./fetchHtmlAndUrl.usecase";
import { processImages } from "./process/processImages.usecase";
import { replaceImageUrls} from "../../utils/parse/image/replaceImageUrls";
import { processImageType } from "../../type/image/imageType";

export const uploadImages = async ({
  url, 
  admin, 
  shopName, 
  type
}: processImageType): Promise<string> => {
  
  const { html, imageUrls } = await fetchHtmlAndUrl({url, type}); 
  const uploadResults = await processImages({
    imageUrls, 
    admin, 
    shopName
  }); 
  
  const finalHtml = replaceImageUrls({
    html, 
    results: uploadResults
  }); 
  
  return finalHtml;
};