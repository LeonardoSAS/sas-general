export function isBase64Image(
  url: string
): boolean {
  return url.startsWith("data:image/");
}
