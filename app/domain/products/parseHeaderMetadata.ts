import { MetafieldType, validTypes } from "app/type/product/metafield/metafield";
import { parseHeaderMetadataType } from "app/type/product/productType";
import { pushHeaderError } from "app/domain/helpers/pushHeaderError";

export function parseHeaderMetadata({
  header,
  sku,
  lineNumber,
  processingErrors,
  lineProcessingErrors,
  lineErrors,
}: parseHeaderMetadataType ) {
  
  const fail = (message: string) => {
    pushHeaderError({
      sku,
      header,
      lineNumber,
      message,
      processingErrors,
      lineProcessingErrors,
      lineErrors
    });
  };

  const validate = (
    condition: boolean, 
    message: string
  ) => {
    if (!condition) {
      fail(message);
      
      return false;
    }
    return true;
  };

  const trimmedHeader = header.trim();
  const isPriceHeader =
    trimmedHeader === 'price' ||
    trimmedHeader === 'variant.price' ||
    trimmedHeader.endsWith('.price');

  const typeMatch = header.match(
    /\[(.*?)\]$/
  );
  const type = typeMatch?.[1] ?? null;
  
  const headerWithoutType = typeMatch ? 
    header.replace(
      /\[.*?\]$/, ''
    ) : header;

  if (!validate(
    !!typeMatch || isPriceHeader,
    `Invalid header: ${header}. Must include type in brackets (example: product.custom.color[single_line_text_field]) or use 'price' for price updates`
  )) {
    return null;
  }

  const parts = headerWithoutType.
    split('.').filter(Boolean);
  const isPriceField = parts.length > 0 && 
    parts[parts.length - 1] === 'price';

  const deriveMeta = () => {
    if (isPriceField) {
      const target = parts.length === 1 ? 
        'variant' : parts[0];
      const namespace = parts.length <= 2 ? 
        '' : parts.slice(1, -1).join('.');
      
      return { 
        target, 
        namespace, 
        key: 'price' 
      };
    }

    if (!validate(
      parts.length >= 3,
      'Invalid header format: Must follow format target.namespace.key[type]'
    )) {
      return null;
    }

    const [
      target, 
      namespace, 
      key
    ] = parts;

    return { 
      target, 
      namespace, 
      key 
    };
  };

  const meta = deriveMeta();
  
  if (!meta){
    return null;
  }

  const { 
    target, 
    namespace, 
    key 
  } = meta;

  if (!validate(
    target === 'product' || target === 'variant',
    `Invalid target: ${target}. Must be 'product' or 'variant'`
  )) {
    return null;
  }
  if (!isPriceField) {
    if (!validate(
      !!namespace && !!key && key.length >= 2,
      'Invalid namespace or key: Namespace and key are required, and key must be at least 2 characters long'
    )) {
      return null;
    }
    if (!validate(
      type !== null,
      `Invalid header: ${header}. Must include type in brackets (example: product.custom.color[single_line_text_field])`
    )) {
      return null;
    }
    if (!validate(
      validTypes.includes(type as MetafieldType['type']),
      `Invalid type: ${type}. Must be one of: ${validTypes.join(', ')}`
    )) {
      return null;
    }
  }

  const result = { 
    target, 
    namespace, 
    key, 
    type, 
    isPriceField 
  };
  
  return { 
    result 
  };
}