import { join } from "./deps.ts";

/**
 * Type of values that {@link traverseFileSystem} yields
 */
export interface Item {
  /** Path to directory that contains current item */
  readonly container: string;
  /** Stat info and name of current item */
  readonly info: Deno.DirEntry;
}

/**
 * Interface of parameter `deep` of {@link traverseFileSystem}
 */
export interface DeepFunc {
  /**
   * @param param Current item
   * @returns `true` to explore current item, `false` otherwise
   */
  (param: Item): boolean;
}

/**
 * Traverse a file system tree
 * @param container Root of the tree
 * @param deep Determine whether a particular directory should be explored
 * @returns An async iterator of {@link Item}
 */
export async function* traverseFileSystem(
  container: string,
  deep: DeepFunc,
): AsyncGenerator<Item, void, unknown> {
  for await (const info of Deno.readdir(container)) {
    const item: Item = {
      container,
      info,
    };
    yield item;
    if (info.isDirectory && deep(item)) {
      yield* traverseFileSystem(join(container, info.name), deep);
    }
  }
}

export default traverseFileSystem;
