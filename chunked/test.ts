#!/usr/bin/env deno
// @ts-ignore
import { runTests, test } from "https://deno.land/std/testing/mod.ts";
import {
  AssertionError,
  assertEquals,
  assertThrowsAsync
  // @ts-ignore
} from "https://deno.land/std/testing/asserts.ts";
// @ts-ignore
import { CHUNK_SIZE, concatChunks, readChunks, readBuffered } from "./mod.ts";

test(function concatTypedArraysOk(): void {
  assertEquals(concatChunks(Uint8Array, []), new Uint8Array([]));
  assertEquals(concatChunks(Uint8Array, [new Uint8Array([0])]), [0]);
  assertEquals(
    concatChunks(Uint8Array, [new Uint8Array([0]), new Uint8Array([1])]),
    [0, 1]
  );
});

test(async function readChunksOk(): Promise<void> {
  let reader: Deno.Reader;
  let chunks: Uint8Array[];
  reader = new Deno.Buffer(new ArrayBuffer(10));
  chunks = [];
  for await (let chunk of readChunks(reader, 1)) {
    chunks.push(chunk);
  }
  assertEquals(chunks, new Array(10).fill(new Uint8Array(1)));
});

test(async function readChunksThrows(): Promise<void> {
  let reader: Deno.Reader;
  await assertThrowsAsync(
    async () => {
      reader = new Deno.Buffer(new ArrayBuffer(0));
      await readChunks(reader, 0).next();
    },
    AssertionError,
    "must be higher than 0"
  );
  await assertThrowsAsync(
    async () => {
      reader = new Deno.Buffer(new ArrayBuffer(0));
      await readChunks(reader, 1.1).next();
    },
    AssertionError,
    "must be an integer number"
  );
});

test(async function readBufferedOk(): Promise<void> {
  let reader: Deno.Reader;
  reader = new Deno.Buffer(new ArrayBuffer(0));
  assertEquals(await readBuffered(reader), []);
  reader = new Deno.Buffer(new ArrayBuffer(CHUNK_SIZE + 1));
  assertEquals(await readBuffered(reader), new Uint8Array(CHUNK_SIZE + 1));
  reader = new Deno.Buffer(new ArrayBuffer(CHUNK_SIZE));
  assertEquals(await readBuffered(reader, {}), new Uint8Array(CHUNK_SIZE));
  reader = new Deno.Buffer(new ArrayBuffer(CHUNK_SIZE));
  assertEquals(
    await readBuffered(reader, { chunkSize: 1 }),
    new Uint8Array(CHUNK_SIZE)
  );
});

async function main(): Promise<void> {
  await runTests();
  Deno.exit();
}

main();
