export class Queue<T> {
  private contents: T[];

  constructor(...items: ReadonlyArray<T>) {
    this.contents = items.slice();
  }

  enqueue(item: T) {
    this.contents.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw Error("Queue underflow");
    }
    return this.contents.shift();
  }

  peek() {
    if (this.isEmpty()) {
      throw Error("Queue underflow");
    }
    return this.contents[0];
  }

  isEmpty() {
    return this.contents.length === 0;
  }
}
