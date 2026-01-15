import { datetimeShop } from "../../../utils/helpers/shop-datetime";
import { uploadWebpToShopify } from "../../../domain/images/uploadWebptoShopify.domain";
import { fetchImage } from "../../../infrastructure/http/fetchImages";
import { UploadImagesInputType, UploadImagesResultItemType } from "../../../type/image/imageType";

export async function processImages({
  imageUrls, 
  admin, 
  shopName
}: UploadImagesInputType): Promise<UploadImagesResultItemType[]> {
  
  const results: UploadImagesResultItemType[] = [];
  
  let counter = 1;

  for (const oldUrl of imageUrls) {
    try {

      const buffer = await fetchImage(oldUrl);
      const filename = `${datetimeShop({
        shopName, 
        sequenceNumber: 
        counter
      })}.webp`;
      
      const finalUrl = await uploadWebpToShopify({
        admin,
        buffer,
        filename,
      });

      results.push({
        oldUrl,
        newUrl: finalUrl,
      });
      counter++;
    } 
    catch (err: any) {
      console.error(`Fail Image: ${oldUrl}`, err.message || err);
      
      results.push({
        oldUrl,
        newUrl: undefined,
      });
    }
  }

  return results;
}