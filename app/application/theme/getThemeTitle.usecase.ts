import { fetchThemeContent } from "../../infrastructure/shopify/helpers/theme/shopifyTheme.adapter";
import { extractTitleFromTheme } from "../../utils/parse/extract/extract-title";
import { adminType } from "../../type/general";

export async function getThemeTitleUseCase(
  admin: adminType
): Promise<string> {
  
  const content = await fetchThemeContent(admin);

  return extractTitleFromTheme(content);
}