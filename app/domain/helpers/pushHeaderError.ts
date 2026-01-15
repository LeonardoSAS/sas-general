import { pushHeaderErrorType } from "app/type/product/productType";

export function pushHeaderError({ 
  sku, 
  header, 
  lineNumber,
  message,
  processingErrors,
  lineProcessingErrors,
  lineErrors 
}: pushHeaderErrorType){

  lineErrors.push(message);
  
  const processingError = {
    sku,
    header,
    message,
    line: lineNumber
  };
  
  lineProcessingErrors.push(processingError);
  processingErrors.push(processingError);
  
  return null;
}