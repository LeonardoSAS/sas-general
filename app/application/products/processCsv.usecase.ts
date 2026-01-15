import { MetafieldDataType } from "app/type/product/metafield/metafield";
import { ProcessingErrorType } from "app/type/general";
import { optional } from "app/const/general";
import { splitLines, parseHeaders, lineFormat } from "app/utils/parse/layout/layout-products";
import { metafieldsFromLine } from "./csv/metafieldsFromLine";

export function processCSV(
  content: string
): MetafieldDataType[] {

  const lines = splitLines(content);
  const headers = parseHeaders(lines);

  const results: MetafieldDataType[] = [];
  const processingErrors: ProcessingErrorType[] = [];
  
  let processedLines = 0;
  let linesWithErrors = 0;

  for (let i = 1; i < lines.length; i++) {
    
    const values = lineFormat(lines[i]);
    const { 
      metafields, 
      lineErrors, 
      lineWarnings, 
      lineProcessingErrors, 
      hasErrors
    } = metafieldsFromLine({
      headers,
      values,
      lineNumber: i + 1,
      processingErrors,
    });

    if (metafields.length) {
      results.push({
        sku: values[0],
        metafields,
        warnings: optional(lineWarnings),
        errors: optional(lineErrors),
        processingErrors: optional(lineProcessingErrors),
      });
      processedLines++;
    }

    if (hasErrors){ 
      linesWithErrors++;
    }
  }

  if (results.length) {
    results[0].processingErrors = processingErrors;
    results[0].processingSummary = {
      totalLines: lines.length - 1,
      processedLines,
      linesWithErrors,
    };
  }

  return results;
}