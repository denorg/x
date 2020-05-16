// @ts-ignore
import { assert } from "https://deno.land/std/testing/asserts.ts";

/** Mirrors https://github.com/denoland/deno_std/blob/master/io/bufio.ts */
export const CHUNK_SIZE = 4096;

/** The types `concatChunks` accepts for inputs and output. */
export type Chunk =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

/**
 * Concatenates a list of chunks (typed arrays).
 * @param ChunkConstructor Which constructor will be used to contain the result
 * @param chunks A list of chunks to concatenate
 */
export function concatChunks<ChunkType extends Chunk>(
  ChunkConstructor: new ([]: number) => ChunkType,
  chunks: ChunkType[]
): ChunkType {
  let totalSize = 0;
  for (let n = 0, l = chunks.length; n < l; n++) {
    totalSize += chunks[n].length;
  }
  const data = new ChunkConstructor(totalSize);
  for (let n = 0, o = 0, l = chunks.length; n < l; o += chunks[n].length, n++) {
    data.set(chunks[n], o);
  }
  return data;
}

/**
 * Yields all chunks read from a `Reader` until eof.
 * @param reader A `Deno.Reader` to read data from
 * @param chunkSize Amount of bytes that will be read per chunk
 */
export async function* readChunks(
  reader: Deno.Reader,
  chunkSize: number
): AsyncIterableIterator<Uint8Array> {
  assert(chunkSize > 0, "Parameter `chunkSize` must be higher than 0");
  assert(
    Number.isInteger(chunkSize),
    "Parameter `chunkSize` must be an integer number"
  );
  for (;;) {
    const chunk = new Uint8Array(chunkSize);
    const { nread, eof } = await reader.read(chunk);
    if (nread === 0) break;
    yield nread < chunkSize ? chunk.slice(0, nread) : chunk;
    if (eof) break;
  }
}

/**
 * A set of options for the `readBuffered` function.
 * @param chunkSize (optional) Amount of bytes that will be read per chunk
 */
export interface ReadBufferedOptions {
  chunkSize?: number;
}

/**
 * Reads all output from a `Reader` until eof.
 * @param reader A `Deno.Reader` to read data from
 * @param options (optional) An object implementing `ReadBufferedOptions`
 */
export async function readBuffered(
  reader: Deno.Reader,
  { chunkSize = CHUNK_SIZE }: ReadBufferedOptions = {
    chunkSize: CHUNK_SIZE
  }
): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  for await (let chunk of readChunks(reader, chunkSize)) chunks.push(chunk);
  return concatChunks(Uint8Array, chunks);
}
