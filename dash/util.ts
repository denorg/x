/**
 * Check if data is JSON serializable
 * @param value The value to check
 */
export function isSerializable(value: any): boolean {
  if (typeof value == "boolean") return true;
  else if (typeof value == "number") return true;
  else if (typeof value == "string") return true;
  else if (value instanceof Object) return true;
  else return false;
}
