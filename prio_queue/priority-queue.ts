import { identity } from "./common.ts";
import { BinaryHeap } from "./binary-heap.ts";

export class PriorityQueue<T = any, U = T> {
  private heap: BinaryHeap<T, U>;

  constructor(
    private mapper: (item: T) => U = identity,
    ...items: ReadonlyArray<T>
  ) {
    this.heap = new BinaryHeap(mapper);
    for (const item of items) {
      this.heap.push(item);
    }
  }

  enqueue(item: T) {
    this.heap.push(item);
  }

  dequeue() {
    if (this.heap.isEmpty()) {
      throw Error("Priority queue underflow");
    }
    return this.heap.pop();
  }

  peek() {
    if (this.heap.isEmpty()) {
      throw Error("Priority queue underflow");
    }
    return this.heap.peek();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}
