export async function fetchHtml(
  url: string
): Promise<string>{
  
  try {
    const response = await fetch(
      url, {
        method: "GET",
        headers: {
          "Content-Type": "Mozzila/5.0",
          "Accept": "*/*"
        }
      }
    );
    const html = await response.text();

    return html;
  } 
  catch (error) {
    console.log(error);
    return "";
  }
}