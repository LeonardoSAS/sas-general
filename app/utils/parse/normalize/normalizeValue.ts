export function normalizeValue(
  value: string
): string {
  
  let processedValue: string;

  try {
    
    const parsedValue = JSON.parse(value);

    if (Array.isArray(parsedValue)) {
      const stringArray = parsedValue.map(
        item => String(item)
      );
      processedValue = JSON.stringify(stringArray);
    } 
    else if (typeof parsedValue === 'object') {
      processedValue = JSON.stringify(parsedValue);
    } 
    else if (typeof parsedValue === 'string') {
      const trimmedParsed = parsedValue.trim();
      
      if (trimmedParsed.startsWith('[') && trimmedParsed.endsWith(']')) {
        const inner = trimmedParsed.slice(1, -1);
        const parts = inner.split(',').map(
          p => p.trim()).filter(Boolean);
        processedValue = JSON.stringify(parts);
      } 
      
      else {
        processedValue = trimmedParsed;
      }
    } 
    else {
      processedValue = String(parsedValue);
    }
  } 
  catch {
    const trimmed = value.trim();
    
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      const inner = trimmed.slice(1, -1);
      const parts = inner.split(',').map(p => p.trim()).filter(Boolean);
      processedValue = JSON.stringify(parts);
    } 
    else {
      processedValue = value.trim();
    }
  }

  return processedValue;
}