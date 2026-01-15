import { PriceValueInputType } from "app/type/product/price/price";

export function parsePriceValue(
  value: PriceValueInputType
): number {
  
  const pick = Array.isArray(value) ? value[0] : value;

  if (typeof pick === "string"){
    return parseFloat(pick);
  }

  return Number(pick);
}