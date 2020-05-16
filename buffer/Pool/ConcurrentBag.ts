export default class ConcurrentBag<T> {
  // Thread Safe 하면서 성능을 올리기위하여 크리티컬 섹션을 사용하고 ThreadLocal 같은것을 사용하여
  // Thread 별로 캐쉬를 만들어야 하지만 일단 다중 스레드환경을 고려하지 않고 만든다.
  private itemQueue: Queue<T> = new Queue<T>();
  private isLock: boolean = false;

  public TryTake(): T | undefined {
    while (this.isLock);

    this.isLock = true;
    try {
      return this.itemQueue.dequeue();
    } finally {
      this.isLock = false;
    }
  }

  public Add(item: T): void {
    while (this.isLock);

    this.isLock = true;
    try {
      this.itemQueue.enqueue(item);
    } finally {
      this.isLock = false;
    }
  }
}

class Queue<T> {
  _queue: T[];

  constructor(queue?: T[]) {
    this._queue = queue || [];
  }

  get empty(): boolean {
    return this.count == 0;
  }

  enqueue(item: T) {
    this._queue.push(item);
  }

  dequeue(): T | undefined {
    return this._queue.shift();
  }

  clear() {
    this._queue = [];
  }

  get count(): number {
    return this._queue.length;
  }
}
