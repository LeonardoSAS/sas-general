import { datetimeShop } from "../../../utils/helpers/shop-datetime";
import { uploadWebpToShopify } from "../../../domain/images/uploadWebptoShopify.domain";
import { fetchImage } from "../../../infrastructure/http/fetchImages";
import { UploadImagesInputType, UploadImagesResultItemType } from "../../../type/image/imageType";

export async function processImages({
  imageUrls, 
  admin, 
  shopName
}: UploadImagesInputType): Promise<UploadImagesResultItemType[]> {
  
  const uploadPromises = imageUrls.map(
    async (oldUrl, index) => 
  {
    try {
      const buffer = await fetchImage(oldUrl);
      const filename = `${datetimeShop({
        shopName, 
        sequenceNumber: index + 1
      })}.webp`;
      
      const finalUrl = await uploadWebpToShopify({
        admin,
        buffer,
        filename,
      });

      return {
        oldUrl,
        newUrl: finalUrl,
      };
    } 
    catch (err: any) {
      console.error(`Fail Image: ${oldUrl}`, err.message || err);
      
      return {
        oldUrl,
        newUrl: undefined,
      };
    }
  });
  
  const results = await Promise.allSettled(
    uploadPromises
  );
  
  return results.map((result) => 
    result.status === "fulfilled" 
      ? result.value 
      : { 
        oldUrl: "unknown", 
        newUrl: undefined
      }
  );
}