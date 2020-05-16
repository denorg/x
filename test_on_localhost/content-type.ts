import { extname } from "./deps.ts";
import MEDIA_TYPES from "./media-types.ts";
/** Returns the content-type based on the extension of a path. */
export function contentType(path: string): string | undefined {
  return MEDIA_TYPES[extname(path)];
}
export default contentType;
