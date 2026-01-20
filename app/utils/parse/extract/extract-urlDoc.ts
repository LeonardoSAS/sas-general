export function extractImageUrlsFromDoc(
  html: string
): string[] {

  const images: string[] = [];
  const regex = /<img[^>]+src=["']([^"']+)["']/g;

  let match;

  while ((match = regex.exec(html)) !== null) {
    const src = match[1];

    if (src.startsWith("http://") || 
      src.startsWith("https://") || 
      src.startsWith("data:image/")) {
        
      images.push(src);
    }
  }
  
  return images;
}