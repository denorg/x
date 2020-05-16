export interface InvertType {
  [index: string]: string | number;
  [index: number]: string | number;
}

/** Invert key-value pair of an object */
export function invert(obj: InvertType): InvertType {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[value] = key;
  }
  for (const symbol of Object.getOwnPropertySymbols(obj)) {
    const value = obj[symbol.toString()];
    result[value] = symbol;
  }
  return result as InvertType;
}
