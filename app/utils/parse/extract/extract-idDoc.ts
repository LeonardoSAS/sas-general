export function convertToHtmlExportUrl(
  docUrl: string
): string {
  
  if (!docUrl){
    return "";
  }

  const match = docUrl.match(
    /\/d\/([a-zA-Z0-9_-]+)/
  );
  
  if (!match){
    return "";
  }
  const id = match[1];

  return `https://docs.google.com/document/d/${id}/export?format=html`;
}