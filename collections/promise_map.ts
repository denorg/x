import { DeferredQueue } from "./deferred_queue.ts";

export interface PromiseMapOptions {
  concurrency?: number;
  collect?: boolean;
}

export async function promiseMap<T, U>(
  it: Iterable<T> | AsyncIterable<T>,
  fn: (t: T) => Promise<U>,
  options: PromiseMapOptions
): Promise<Array<U>> {
  const q = new DeferredQueue<void>(
    { maxPoolSize: options.concurrency, creator: () => undefined }
  );
  const results: Array<U> = [];
  let err: any;
  for await (const i of it) {
    await q.pop();
    fn(i)
      .then(u => {
        if (options.collect) {
          results.push(u);
        }
      })
      .catch(e => {
        // should we failfast?
        err = e;
      })
      .finally(() => q.push());
  }
  await q.untilEmpty();
  if (err) throw err;
  return results;
}
