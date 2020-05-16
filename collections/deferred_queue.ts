import { Deferred, deferred } from "./deps.ts";
import { Deque, Queue } from "./mod.ts";

export interface DeferredQueueOption<T> {
  creator?: () => T | Promise<T>;
  maxPoolSize?: number;
  maxQueueSize?: number;
  pool?: Iterable<T>;
}

export class DeferredQueue<T> {
  private _pool: Queue<T>;
  private _createPoolItem?: () => T | Promise<T>;
  private _maxPoolSize: number;
  private _queue: Queue<Deferred<T>>;
  private _poolSize: number;
  private _untilEmpty?: Promise<void>;

  constructor(options: DeferredQueueOption<T>) {
    this._maxPoolSize = options.maxPoolSize || 0;
    if (!options.maxPoolSize && !options.pool) {
      throw Error("Must provide either maxPoolSize or pool");
    }
    if (!options.pool && !options.creator) {
      throw Error("Must provide creator if pool is empty");
    }
    if (options.maxQueueSize) {
      if (options.maxQueueSize! <= 0) {
        throw Error("maxQueueSize must be > 0");
      } else {
        this._queue = new Deque<Deferred<T>>(
          { size: options.maxQueueSize!, throwIfFull: true }
        ) as Queue<Deferred<T>>;
      }
    } else {
      this._queue = [];
    }
    this._createPoolItem = options.creator;
    this._pool = options.pool ? [...options.pool] : [];
    this._poolSize = this._pool.length!;
  }

  async pop(): Promise<T> {
    // we must avoid a race condition where a pop() can happen
    // as another `await d` (see below) occurs.
    if (this._queue!.length === 0 && this._pool.length! > 0) {
      return this._pool.shift()!;
    } else if (this._createPoolItem && this._poolSize < this._maxPoolSize) {
      this._poolSize++;
      return await this._createPoolItem();
    }
    const d = deferred<T>();
    this._queue.push(d);
    await d;
    return this._pool.shift()!;
  }

  push(value: T): void {
    this._pool.push(value);
    if (this._queue.length! > 0) {
      const d = this._queue.shift()!;
      d.resolve();
    }
  }

  get size(): number {
    return this._poolSize;
  }

  get available(): number {
    return this._pool.length!;
  }

  async untilEmpty(): Promise<void> {
    if (this._untilEmpty !== undefined) {
      return this._untilEmpty;
    }
    // We set this to protect a user calling untilEmpty twice.
    this._untilEmpty = (async () => {
      do {
        const d = deferred<T>();
        this._queue.push(d);
        await d;
      } while (this.size !== this.available);
      this._untilEmpty = undefined;
    })();
    return this._untilEmpty;
  }

  [Symbol.asyncIterator]() {
    const that = this;
    return {
      next: async function(): Promise<any> {
        return {
          done: false,
          value: await that.pop()
        };
      }
    };
  }
}
