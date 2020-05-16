import url from "./url.ts";

// will genrate random
const random = (bytes: number) => {
  return crypto.getRandomValues(new Uint32Array(bytes));
}
// uniq - will generate unique ids in javascript
export const uniq = (size: number = 12): string => {
  let id: string = "";
  const bytes: Uint32Array = random(size);
  while (size--) id += url[bytes[size] & 63];
  return id;
};

export default uniq;
