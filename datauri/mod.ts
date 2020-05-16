import { fromUint8Array, lookup } from "./deps.ts";

export async function datauri(filePath: string): Promise<string> {
  const content = await Deno.readFile(filePath);

  return `data:${lookup(filePath)};base64,${fromUint8Array(content)}`;
}
