import { MetafieldType, MetafieldsFromLineType } from "app/type/product/metafield/metafield";
import { ProcessingErrorType } from "app/type/general";
import { processCell } from "./processCell";

export function metafieldsFromLine({
  headers, 
  values, 
  lineNumber, 
  processingErrors
}: MetafieldsFromLineType) {
  
  const sku = values[0];
  const metafields: MetafieldType[] = [];
  const lineErrors: string[] = [];
  const lineWarnings: string[] = [];
  const lineProcessingErrors: ProcessingErrorType[] = [];

  let hasErrors = false;

  headers.slice(1).forEach((
    header, idx
  ) => {
    const value = values[idx + 1];
    const cellResult = processCell({
      header,
      value,
      sku,
      lineNumber,
      processingErrors,
      lineProcessingErrors,
      lineErrors,
    });

    if (cellResult.hasErrors) {
      hasErrors = true;
    }
    if (cellResult.metafield) {
      metafields.push(
        cellResult.metafield
      );
    }
  });

  return {
    metafields,
    lineErrors,
    lineWarnings,
    lineProcessingErrors,
    hasErrors,
  };
}
