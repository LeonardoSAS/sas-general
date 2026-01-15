export function extractShopName(
  shopUrl: string
): string {

  const shop = shopUrl.replace(/^https?:\/\//, "").split(".")[0];
  
  return shop;
}
