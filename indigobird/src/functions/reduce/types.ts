export type IndigobirdReduceConfig = {
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

export type IndigobirdReduceHandler<T, I> = (
  /**
   * A getter for the aggregate. Whereas a synchronouse [].reduce function
   * can simply provide the aggregate itself as the first argument, because
   * of the asynchronous and possible concurrent execution of these handlers
   * the value of the aggregate could have changed during the asynchronous
   * execution phase of the handler, so we have a getter rather than a
   * closure-captured, potentially stale, version of the aggregate.
   */
  getAggregate: () => T,
  currentItem: I,
  index: number
) => T | PromiseLike<T>;
