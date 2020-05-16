import { closeResource, compress, decompress, Level } from "./mod.ts";
import { assert } from "https://deno.land/std@v0.50.0/testing/asserts.ts";

const data = "hello world";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

Deno.test("Compress Data Using ZSTD", () => {
  const testData = encoder.encode(data);
  const result = compress(testData, Level.Base);
  assert(result !== null, "No result was returned from compression");
});

Deno.test("Decompress And Validate Data", () => {
  const testData = encoder.encode(data);
  const encoded = compress(testData, 3);
  assert(encoded !== null, "No result was returned from compression");
  const decoded = decompress(encoded);
  assert(decoded !== null, "No result was returned from decompression");
  assert(
    decoder.decode(decoded) === data,
    "The returned data was not validated",
  );
});

closeResource();
