export type IndigobirdPropsConfig = {
  /**
   * The number of handlers that are able to be executed simultaneously.
   * Default = 1
   */
  concurrency?: number;
};

export type IndigobirdPropsHandler<T, I, K> = (currentItem: I, key: K) => T;
