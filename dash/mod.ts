import { isSerializable } from "./util.ts";
const decoder = new TextDecoder("utf-8");

type Nullable<T> = T | null;
type Identifier = string | number;

/**
 * The options for the cache class
 */
export interface CacheOptions {
  /**
   * The max number of items the cache can store (defaults to 10,000)
   */
  limit?: number;
  /**
   * Wether to serialize json-parsable data
   */
  serialize?: boolean;
  /**
   * Use a logical limiting system
   */
  logical?: boolean;
}

/**
 * The main Dash cache class
 */
export class Cache {
  #limit: number;
  #entries: Map<Identifier, any>;
  #serialize: boolean;
  #logical: boolean;
  #overwrites: number;
  /**
   * Creates an instance of Cache
   * @param options The configuration for the cache
   */
  constructor(options?: CacheOptions) {
    this.#logical = options?.logical ?? false;
    this.#serialize = options?.serialize ?? false;
    this.#limit = options?.limit ?? 10000;
    this.#entries = new Map();
    this.#overwrites = 0;
  }
  /**
   * Set's a key:value pair in the cache
   * @param key The key to store the value under
   * @param data The value to store in the cache
   */
  set(key: Identifier, data: any): void {
    let serializedData = data;
    if (this.#serialize && isSerializable(data)) {
      const dataString = JSON.stringify(data);
      serializedData = new Uint8Array(dataString.length);
      serializedData.set(dataString.split("").map((c) => c.charCodeAt(0)));
    }
    if (this.#entries.size >= this.#limit) {
      if (this.#logical) {
        this.#overwrites += 1;
        if (this.#overwrites >= 10) {
          this.#overwrites = 0;
          this.#limit += 10;
        }
      }
      this.#entries.delete(this.#entries.keys().next().value);
      this.#entries.set(key, serializedData);
    } else this.#entries.set(key, serializedData);
  }
  /**
   * Attemps to retrieve a value from the cache
   * @param key The key to get a value from the cache
   */
  get(key: Identifier): Nullable<any> {
    if (this.#entries.has(key)) {
      this.#entries.set(key, this.#entries.get(key));
      const data = this.#entries.get(key);
      if (data instanceof Uint8Array) {
        return JSON.parse(decoder.decode(data));
      } else return data;
    } else return null;
  }
  /**
   * Returns the internal cache limit
   */
  get limit(): number {
    return this.#limit;
  }
  /**
   * Returns the current amount of items in the cache
   */
  get size(): number {
    return this.#entries.size;
  }
  /**
   * Returns the internal map of cache entries
   */
  get entries(): Map<Identifier, any> {
    return this.#entries;
  }
}
