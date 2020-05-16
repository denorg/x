/**
 * Convert Windows backslash paths to slash paths: `foo\\bar` ➔ `foo/bar`.
 * [Forward-slash paths can be used in Windows](http://superuser.com/a/176395/6877) as long as they're not extended-length paths and don't contain any non-ascii characters.
 *
 * @param path - A Windows backslash path.
 * @returns A path with forward slashes.
 * @example
 *
 * ```
 * import { slash } from "https://deno.land/x/slash/mod.ts";
 *
 * slash("foo\\bar");
 * // Unix    => foo/bar
 * // Windows => foo/bar
 * ```
 */
export default function slash(path: string): string {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path);

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, "/");
}
