export function splitLines(
  content: string
): string[] {
  
  return content.replace(
    /\r\n/g, "\n"
  ).split("\n").filter(line => line.trim() !== "");
}

export function parseHeaders(
  lines: string[]
): string[] {
  
  const headerLine = lines[0] ?? "";
  
  return headerLine.split(",").map((
    header) => header.trim()
  );
}

export function lineFormat(
  line: string
): string[] {

  const values: string[] = [];

  let current = "";
  let depth = 0;
  let inQuotes = false;

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "[" && !inQuotes) depth++;
    if (char === "]" && !inQuotes && depth > 0) depth--;

    const isSeparator = char === "," && depth === 0 && !inQuotes;
    
    if (isSeparator) {
      values.push(current.trim());
      current = "";
    }
    else {
      current += char;
    }
  }

  if (current) {
    values.push(current.trim());
  }
  
  return values.map(value => {
    return value.replace(/,\s+/g, ",");
  });
}

export function cleanJsonValue(
  value: string
): string {
  return value.replace(/\\"/g, '"');
}
   