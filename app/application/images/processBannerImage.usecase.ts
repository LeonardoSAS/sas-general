import { uploadWebpToShopify } from "app/domain/images/uploadWebptoShopify.domain";
import { adminFormDataType } from "app/type/general";

export async function processBannerImage({
  admin, 
  formData
}: adminFormDataType) {
  
  const entry = formData.get("image_banner");

  if (!(entry instanceof File) || (!entry.name || entry.size === 0)){
    return "";
  }

  const buffer = Buffer.from(
    await entry.arrayBuffer()
  );
    
  return await uploadWebpToShopify({
    admin,
    buffer,
    filename: entry.name,
  });
}