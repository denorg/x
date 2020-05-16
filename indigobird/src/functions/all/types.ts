export type IndigobirdAllConfig = {
  /**
   * The number of handlers that are able to be executed simultaneously.
   * Default = 1
   */
  concurrency?: number;
};

export type IndigobirdAllHandler<T, I> = (currentItem: I, index: number) => T;
