import { isWindows } from "../lib/utils.ts";

export function fixDirnameWindows(dirname: string) {
  if (isWindows) {
    return dirname.slice(1);
  }

  return dirname;
}
