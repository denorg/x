export class FullError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "FullError";
  }
}

export interface DequeOptions<T> {
  size: number;
  it?: Iterable<T>;
  throwIfFull?: boolean;
}

/*
 * Deque is an Array-like structure with a max size.
 *
 * Create by optionally passing an Iterable:
 *
 *      const q = new Deque(2, [1, 2, 3])
 *      console.log([...q])  // [2, 3]
 *
 */
export class Deque<T> implements Iterable<T> {
  private _array: T[];
  private _maxSize: number;
  private _throwIfFull: boolean;
  constructor(options: DequeOptions<T>) {
    this._array = options.it ? [...options.it].slice(-options.size) : [];
    this._maxSize = options.size;
    this._throwIfFull = !!options.throwIfFull;
  }
  clear(): void {
    this._array = [];
  }
  shift(): T | undefined {
    return this._array.shift();
  }
  pop(): T | undefined {
    return this._array.pop();
  }
  push(value: T): void {
    if (this.length == this.maxSize) {
      if (this._throwIfFull) {
        throw new FullError();
      } else {
        this._array.shift();
        // FIXME should we be returning this value in this case?
      }
    }
    this._array.push(value);
  }
  unshift(value: T): void {
    if (this.length == this.maxSize) {
      if (this._throwIfFull) {
        throw new FullError();
      } else {
        this._array.pop();
        // FIXME should we be returning this value in this case?
      }
    }
    this._array.unshift(value);
  }
  get length(): number {
    return this._array.length;
  }

  get maxSize(): number {
    return this._maxSize;
  }

  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }
}
