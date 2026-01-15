export function pageCleaner(
  body: string
): string {

  const cleaned = extractContent(body);

  return cleaned ? buildStylePage() + cleaned : "";
}

function extractContent(
  html: string
): string | null {

  const lines = html.split("\n");

  const start = lines.findIndex(l => 
    l.includes('<div class="wrapper"'
    ));

  if (start === -1){
    return null;
  }

  const footerStart = lines.findIndex((l, i) =>
    i >= start && l.includes(
      'class="templateSection templateFooter"'
    )
  );

  let end = -1;

  if (footerStart !== -1) {
    let divCount = 0;
    let footerContent = "";

    for (let i = footerStart; i < lines.length; i++) {
      const line = lines[i];
      
      divCount += (line.match(
        /<div/g) || []).length;
      divCount -= (line.match(
        /<\/div>/g) || []).length;

      if (i > footerStart) {
        footerContent += line;
      }
      if (divCount === 0 && i > footerStart) {
        const hasContent = footerContent.replace(
          /<[^>]+>/g, "").trim().length > 0;
        
        if (hasContent) {
          end = i;
        } else {
          end = footerStart - 1;
        }
        break;
      }
    }
  } else {
    let divCount = 0;

    for (let i = start; i < lines.length; i++) {
      const line = lines[i];
      
      divCount += (line.match(
        /<div/g) || []).length;
      divCount -= (line.match(
        /<\/div>/g) || []).length;
      
      if (divCount === 0 && i > start) {
        end = i;
        break;
      }
    }
  }

  const slice = lines.slice( 
    start, end !== -1 ? end + 1 : undefined
  );

  return cleanBlockPage(
    slice.join("\n")
  );
}

function cleanBlockPage(
  html: string
): string {

  let firstH2 = true;

  return html
    .split("\n")
    .map(line => {
      line = hideDivider(line);

      if (line.includes(
        '<h2 class="null"'
      )) {
        const margin = firstH2
          ? "margin: -5px 0px 20px 0px !important;"
          : "margin: 25px 0px !important;";
        firstH2 = false;
        line = line.replace(
          /style="([^"]*)"/, `style="$1${margin}"`
        );
      }

      return line.replace(
        /background-image\s*:\s*url\(https:\/\/mcusercontent[^\s)]+\)/,
        ""
      );
    })
    .join("\n");
}

function hideDivider(
  line: string
): string {

  if (line.includes(
    "mcnDividerBlockInner"
  ))
    return line.replace(
      /style="([^"]*)"/, 'style="$1display:none;"'
    );

  if (line.includes(
    'mcnDividerBlock"'
  ))
    return line.replace(
      'class="mcnDividerBlock"',
      'class="mcnDividerBlock" style="display:none;"'
    );

  return line;
}

function buildStylePage(): string {
  
  return `
    <style>
      @media screen and (max-width: 900px) {
        .mcnCaptionColumn { display: block !important; }
      }
      @media screen and (max-width: 670px) {
        .columnContainer,
        .mcnTextBlockInner,
        .mcnCaptionBlock { display: block !important; }
      }
    </style>
  `.trim() + "\n";
}