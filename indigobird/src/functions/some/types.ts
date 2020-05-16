export type IndigobirdSomeConfig = {
  /**
   * The number of handlers that are able to be executed simultaneously.
   * Default = 1
   */
  concurrency?: number;
  /**
   * The number of handlers which need to resolve successfully in order
   * for the process to be resolved.
   * Default = 1
   */
  amount?: number;
};

export type IndigobirdSomeHandler<T, I> = (currentItem: I, index: number) => T | PromiseLike<T>;
