export const defaultEmptyObject = {};
export const defaultEmptyArray: any[] = [];

export function toArgsStringList(
  args: string | string[] | undefined
): string[] {
  if (args == null) return defaultEmptyArray;

  if (typeof args === "string") {
    return args.split(" ");
  }

  if (Array.isArray(args)) {
    return args;
  }

  return defaultEmptyArray;
}

export const isWindows = Deno.build.os === "windows";
