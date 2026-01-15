import { MetafieldType } from "app/type/product/metafield/metafield";
import { ProcessCellResultType, ProcessCellType } from "app/type/product/productType";
import { parseHeaderMetadata } from "app/domain/products/parseHeaderMetadata";
import { normalizeValue } from "app/utils/parse/normalize/normalizeValue";

export function processCell({
  header, 
  value, 
  sku, 
  lineNumber, 
  processingErrors, 
  lineProcessingErrors, 
  lineErrors
}: ProcessCellType): ProcessCellResultType {

  const hasErrors = { hasErrors: true } as const;

  if (!value || !header) {
    return { 
      hasErrors: false
    };
  }

  const headerContext = {
    header,
    sku,
    lineNumber,
    processingErrors,
    lineProcessingErrors,
    lineErrors
  };
  const headerInfo = parseHeaderMetadata(headerContext);

  if (!headerInfo) {
    return hasErrors;
  }

  const { 
    target, 
    namespace, 
    key, 
    type, 
    isPriceField 
  } = headerInfo.result;
  
  const recordError = (message: string) => {
    lineErrors.push(message);

    const processingError = {
      sku,
      header,
      message,
      line: lineNumber
    };

    lineProcessingErrors.push(processingError);
    processingErrors.push(processingError);

    return hasErrors;
  };
  const resolvedType: MetafieldType["type"] | 
    undefined = isPriceField ? "number_decimal" : (
      type as MetafieldType["type"]
    );

  if (!resolvedType) {
    return recordError(`Invalid header: ${header}. No metafield type resolved.`);
  }

  try {
    const processedValue = normalizeValue(value);

    return {
      metafield: {
        namespace,
        key,
        value: processedValue,
        type: resolvedType,
        target: target as "product" | "variant",
      },
      hasErrors: false,
    };

  } catch (error) {
    const errorMsg = `Error processing value: ${error instanceof Error ? error.message : String(error)}`;
    return recordError(errorMsg);
  }
}