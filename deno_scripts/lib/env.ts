// Credits to https://github.com/crowlKats/denv/blob/master/mod.ts
function parse(string: string): Record<string, string> {
  const lines = string
    .split(/\n|\r|\r\n/)
    .filter((line) => (line.startsWith("#") ? false : !!line));

  return Object.fromEntries(
    lines.map((entry) => {
      let [key, val] = entry.split("=");
      const quoteRegex = /^['"](.*)['"]$/;

      if (quoteRegex.test(val)) {
        val = val.replace(quoteRegex, "$1");
      } else {
        val = val.trim();
      }

      return [key, val];
    })
  );
}

/**
 * Read an env file from the specified path
 */
export async function loadEnvFromFile(
  path: string
): Promise<ReturnType<typeof parse>> {
  const file = await Deno.readFile(path);
  const decoder = new TextDecoder();
  return parse(decoder.decode(file));
}

/**
 * Stringify env object values
 */
export function loadEnvFromObject(
  envObj: Record<string, string | number | boolean>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(envObj).map(([key, value]) => [key, String(value)])
  );
}
