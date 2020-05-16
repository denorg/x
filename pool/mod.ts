import { v4 } from "https://deno.land/std@v0.35.0/uuid/mod.ts";

export interface Resource<T> {
  id: string; // resource id
  recentlyUsedAt: Date; // Date of last use of the resource
  count: number; // Uses of resources
  resource: T;
}

export interface Option<T> {
  // Minimum number of resources in the pool. defaults to: 0
  min?: number;
  // Maximum number of resources in the pool. defaults to: min + 1
  max?: number;
  // Allow idle time for resources. defaults to: 1000 * 60 * 10 ms
  idle?: number;
  // Interval time for checking idle resource. Defaults to: 1000 ms
  interval?: number;
  // Defined how to create a resource
  creator: (poll: Pool<T>, resourceID: string) => Promise<T>;
  // Defined how to destroy a resource
  destroyer: (poll: Pool<T>, resource: Resource<T>) => Promise<void>;
}

export class Pool<T> {
  private pool = new Map<string, Resource<T>>();
  public destroyed = false;
  private timer: number;
  constructor(private options: Option<T>) {
    if (!options.min || options.min < 0) {
      options.min = 0;
    }

    if (!options.max || options.max <= options.min) {
      options.max = options.min + 1;
    }

    if (!options.idle || options.idle <= 0) {
      options.idle = 1000 * 60 * 10;
    }

    if (!options.interval || options.interval <= 0) {
      options.interval = 1000;
    }

    // check idle resource
    this.timer = setInterval(() => {
      this.checkIdle();
    }, options.interval);
  }

  // resource size
  public get size(): number {
    return this.pool.size;
  }

  // check if resources are idle and release theme
  private async checkIdle() {
    const currentSize = this.pool.size;
    const now = new Date();

    if (currentSize > 0 && currentSize > this.options.min!) {
      for (const [id, resource] of this.pool.entries()) {
        // If idle time is exceeded, resources are released
        if (
          now.getTime() - resource.recentlyUsedAt.getTime() >
          this.options.idle!
        ) {
          try {
            await this.release(id);
          } catch (err) {
            // ignore error
            console.error(err);
          }
        }
      }
    }
  }

  // release a resource by id
  public async release(id: string): Promise<void> {
    const resource = this.pool.get(id);

    if (!resource) {
      return;
    }

    await this.options.destroyer(this, resource);

    this.pool.delete(id);
  }

  // destroy the pool
  public async destroy(): Promise<void> {
    for (const [id, _] of this.pool.entries()) {
      await this.release(id);
    }
    this.destroyed = true;
    this.timer && clearInterval(this.timer);
    return;
  }

  // get an available resource
  public async get(): Promise<T> {
    if (this.destroyed) {
      throw new Error("the pool have been destroyed");
    }

    // the pool not fulled, it should create new one
    if (this.pool.size < this.options.max!) {
      const id = v4.generate();

      const instance = await this.options.creator(this, id.toString());

      const resource: Resource<T> = {
        id: id.toString(),
        recentlyUsedAt: new Date(),
        count: 1,
        resource: instance
      };

      this.pool.set(id.toString(), resource);

      return instance;
    }

    // otherwise use the resource in pool
    // find the resource which not use at latest
    let resource: Resource<T> | void;

    for (const [_, r] of this.pool.entries()) {
      if (!resource) {
        resource = r;
        continue;
      }

      if (r.recentlyUsedAt < resource.recentlyUsedAt) {
        resource = r;
      }
    }

    if (!resource) {
      throw new Error("There is no resource yet");
    }

    // update resource message
    resource.recentlyUsedAt = new Date();
    resource.count = resource.count + 1;
    this.pool.set(resource.id, resource);

    return resource.resource;
  }
}
