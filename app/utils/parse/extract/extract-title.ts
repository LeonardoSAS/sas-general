export function extractTitleFromTheme(
  content: string
): string {

  const match = content.match(
    /<title[^>]*>([\s\S]*?)<\/title>/i
  );

  if (!match) {
    return "error: no <title> found";
  }
  
  const titleText = match[1].toLowerCase();

  if (titleText.includes("shop")) {
    return "this title contains shop name by default";
  }
  
  return "this title doesn't contain shop name by default";
}
