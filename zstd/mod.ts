import * as plugin from "./plugin.ts";

const encoder = new TextEncoder();
type Nullable<T> = T | null;

/**
 * The compression level to use
 */
export enum Level {
  /**
   * Minimum amount of compression possible
   */
  Min = 1,
  /**
   * The standard base level of compression
   */
  Base = 3,
  /**
   * The most compression zstd supports
   */
  Max = 22,
}

/**
 * Compresses data using the zstd algorithm
 * @param data The data to compress
 * @param level The level of compression to use
 */
export function compress(
  data: Uint8Array,
  level: Level,
): Nullable<Uint8Array> {
  const serializedOptions = encoder.encode(JSON.stringify({ level }));
  // @ts-ignore
  return Deno.core.dispatch(plugin.compress, data, serializedOptions);
}

/**
 * Decompresses a Uint8Array using the ZSTD algorithm
 * @param data The TypedArray to pass to ZSTD to decompress
 */
export function decompress(data: Uint8Array): Nullable<Uint8Array> {
  // @ts-ignore
  return Deno.core.dispatch(plugin.decompress, data);
}

/**
 * Closes the resource used by the bindings
 */
export const closeResource = () => plugin.close();
