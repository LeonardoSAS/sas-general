export function extractImageUrlsFromMailchimp(
  html: string
): string[] {

  const urls = new Set<string>();

  const isValidExternalImage = (
    url: string
  ): boolean => {

    if (!url){
      return false;
    }
    url = url.trim();

    if (url.startsWith("data:")){
      return false;
    }
    return /^https?:\/\//i.test(url);
  };
  const regex = /<img[^>]+src=["']([^"'>]+)["']|background(?:-image)?\s*:\s*url\((['"]?)([^'")]+)\2\)|url\((['"]?)([^'")]+)\4\)/gi;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(html))) {
    const rawUrl = 
      match[1] ||
      match[3] ||
      match[5];
    
    if (!rawUrl){ 
      continue;
    }
    const cleanUrl = rawUrl.trim().
      split("?")[0].split("#")[0];

    if (isValidExternalImage(cleanUrl)){ 
      urls.add(cleanUrl);
    }
  }
  
  return Array.from(urls);
}