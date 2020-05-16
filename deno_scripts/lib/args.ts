import { defaultEmptyArray, toArgsStringList } from "./utils.ts";

export function argifyArgs(
  localArgs: string | string[] | undefined,
  globalArgs: string | string[] | undefined
): string[] {
  const args: string[] = [];

  if (localArgs) {
    args.push(...toArgsStringList(localArgs));
  }

  if (globalArgs) {
    args.push(...toArgsStringList(globalArgs));
  }

  return args;
}

export function argifyTsconfig(
  localTsconfig: string | undefined,
  globalTsconfig: string | undefined
): string[] {
  if (localTsconfig) {
    return ["-c", localTsconfig];
  }
  if (globalTsconfig) {
    return ["-c", globalTsconfig];
  }
  return defaultEmptyArray;
}

export function argifyImportMap(path: string | undefined): string[] {
  if (path) {
    return ["--importmap", path];
  }

  return defaultEmptyArray;
}

export function argifyUnstable(unstable?: boolean): string[] {
  if (unstable) {
    return ["--unstable"];
  }
  return defaultEmptyArray;
}
