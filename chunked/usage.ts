// @ts-ignore
import { concatChunks, readChunks, readBuffered } from "./mod.ts";
// @ts-ignore 
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

async function main(): Promise<void> {
  let chunk: Uint8Array;
  let chunks: Uint8Array[];
  let reader: Deno.Reader;

  // concatChunks example
  chunk = concatChunks(Uint8Array, [new Uint8Array([0]), new Uint8Array([1])]);
  assertEquals(chunk, [0, 1])

  // readChunks example
  reader = new Deno.Buffer(new ArrayBuffer(10));
  chunks = [];
  for await (let chunk of readChunks(reader, 1)) {
    chunks.push(chunk);
  }
  assertEquals(chunks, new Array(10).fill(new Uint8Array(1)));

  // readBuffered example
  reader = new Deno.Buffer(new ArrayBuffer(1024));
  assertEquals(
    await readBuffered(reader, { chunkSize: 1 }),
    new Uint8Array(1024)
  );
}

main();
