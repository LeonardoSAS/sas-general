export function blogCleaner(
  body: string
): string {

  if (!body || typeof body !== "string"){
    return "";
  }
  
  let html = base(body);

  html = fixHeadersRegex(html);
  html = fixImgsRegex(html);
  html = finish(html);

  return html;
}

const base = (h: string) =>
  h.replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/@import\s+url\([^)]*\)\s*;?/gi, "")
    .replace(/<[^>]*\b(class|id)\s*=\s*["']([^"']*comment[^"']*|[^"']*annotation[^"']*|[^"']*cmnt[^"']*)[^>]*>[\s\S]*?<\/[^>]*>/gi, "")
    .replace(/<(p|div|span)[^>]*>[^<]*?Please\s+remove[^<]*?<\/\1>/gi, "")
    .replace(/\s(alt|title)\s*=\s*"[^"]*"/gi, "")
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1")
    .replace(/<a\s+href="[^"]*#[^"]*"[^>]*>\s*\[.\]\s*<\/a>/gi, "")
    .replace(/\s(id|class|style|data-[a-z0-9-]+)=(['"])[\s\S]*?\2/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"])[\s\S]*?\1/gi, "")
    .replace(/<([a-z0-9]+)(\s[^>]*)?>\s*<\/\1>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<\w+:[^>]*>[\s\S]*?<\/\w+:[^>]*>/gi, "")
    .replace(/<\/?o:p[^>]*>/gi, "")
    .replace(/\s*mso-[^:;"]+:[^;"]+;?/gi, "")
    .replace(/\u00A0/g, " ")
    .trim();


const fixHeadersRegex = (h: string) => {
  let firstTag = true;
  
  return h
    .replace(/<(h[1-6]|p)\b([^>]*)>([\s\S]*?)<\/\1>/gi, (
      match, tag, attrs, content
    ) => {
      if (firstTag) {
        firstTag = false;
        return `<h2${attrs}>${content}</h2>`;
      }
      if (tag.match(/^h[1-6]$/i)) {
        return `<h3${attrs}>${content}</h3>`;
      }
      
      return match;
    });
};

const fixImgsRegex = (h: string) =>
  h.replace(/<img\b([^>]*?)(\/?)\s*>/gi, (
    attrs, slash
  ) => {

    const hasWidth = /\swidth\s*=/i.test(attrs);
    const hasStyle = /\sstyle\s*=/i.test(attrs);
    
    let result = `<img${attrs}`;
    
    if (!hasWidth) {
      result += ` width="500"`;
    }
    
    if (!hasStyle) {
      result += ` style="display:block;margin:30px auto;"`;
    } else {
      result = result.replace(/style\s*=\s*"([^"]*)"/i, 
        `style="$1 display:block;margin:30px auto;"`);
    }
    
    result += ` ${slash}>`;

    return result;
  });

const finish = (h: string) =>
  h.replace(/(<br\s*\/?>\s*){3,}/gi, "<br><br>")
    .replace(/>\s+</g, "><")
    .trim();