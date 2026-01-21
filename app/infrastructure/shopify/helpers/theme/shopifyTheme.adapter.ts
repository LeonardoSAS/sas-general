import { GET_THEMES_QUERY, GET_THEME_FILE_QUERY } from "../../../query/query";
import { adminType } from "../../../../type/general";

export async function fetchThemeContent(
  admin: adminType
): Promise<string> {
  
  const themeList = await admin.graphql(
    GET_THEMES_QUERY
  );
  const themeJson = await themeList.json();
  const themeId = themeJson.data?.
    themes?.nodes?.[0]?.id;

  if (!themeId){
    throw new Error("No MAIN theme found");
  }
  
  const fileRes = await admin.graphql(
    GET_THEME_FILE_QUERY, {
      variables: { id: themeId },
    }
  );
  const fileJson = await fileRes.json();

  return fileJson.data.theme.
    files.nodes[0].body.content;
}
