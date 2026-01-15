import { isBase64Image } from "../../utils/parse/image/base64";

export async function fetchImage(
  imageUrl: string
): Promise<Buffer> {
  
  if (isBase64Image(imageUrl)) {
    const base64 = imageUrl.split(",")[1];

    return Buffer.from(base64, "base64");
  }
  const response = await fetch(
    imageUrl, { 
      headers: { 
        "User-Agent": "Mozilla/5.0"
      },
    }
  );
  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
}