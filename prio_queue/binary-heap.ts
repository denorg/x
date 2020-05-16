import { identity } from "./common.ts";

export class BinaryHeap<T = any, U = T> {
  private contents: T[] = [];

  public get length() {
    return this.contents.length;
  }

  constructor(private mapper: (item: T) => U = identity) {}

  public isEmpty() {
    return this.length === 0;
  }

  public push(item: T) {
    this.contents.push(item);
    this.swim();
  }

  public peek() {
    if (this.length === 0) {
      throw Error("Binary heap underflow");
    }
    return Object.freeze(this.contents[0]);
  }

  public pop() {
    if (this.length === 0) {
      throw Error("Binary heap underflow");
    }
    // get the result that should be returned (the item an top)
    const first = this.contents[0];
    // take out the last item
    const last = this.contents.pop() as T;
    // if there are any items left now, we need to do the sinking dance
    if (this.length !== 0) {
      this.contents[0] = last;
      this.sink();
    }
    return first;
  }

  private swim() {
    // we swim up from last place
    let index = this.length - 1;
    const item = this.contents[index];
    const value = this.mapper(item);
    // If the index is zero, we're done, it has swam to the surface
    while (index > 0) {
      // parent element index is half of current index, as children are at 2*n+1 and 2*n+2
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.contents[parentIndex];

      // if the parent has a lower value, we're a proper child, and we stop
      if (value >= this.mapper(parent)) {
        return;
      }

      // if the parent has a higher value, swap the child and parent
      this.contents[parentIndex] = item;
      this.contents[index] = parent;
      // this is uniformly decreasing, so it will go down to 0 if needed
      index = parentIndex;
    }
  }

  public sink() {
    // the item we need to sink starts first
    let index = 0;
    const element = this.contents[index];
    const value = this.mapper(element);

    while (index < this.length / 2) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      if (leftIndex >= this.length) {
        // no left child, we've sunk to the bottom
        return;
      }

      const leftChild = this.contents[leftIndex];
      if (value > this.mapper(leftChild)) {
        this.contents[index] = leftChild;
        this.contents[leftIndex] = element;
        index = leftIndex;
        continue;
      }

      if (rightIndex >= this.length) {
        // no right child, and we're better than the left, we've sunk to the bottom
        return;
      }
      const rightChild = this.contents[rightIndex];
      if (value > this.mapper(rightChild)) {
        this.contents[index] = rightChild;
        this.contents[rightIndex] = element;
        index = rightIndex;
        continue;
      }

      // we're better that both children, so we're a true parent
      return;
    }
  }
}
