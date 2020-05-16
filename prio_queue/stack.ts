export class Stack<T> {
  private contents: T[];

  constructor(...items: ReadonlyArray<T>) {
    this.contents = items.slice();
  }

  push(item: T) {
    this.contents.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw Error("Stack underflow");
    }
    return this.contents.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw Error("Stack underflow");
    }
    return this.contents[this.contents.length - 1];
  }

  isEmpty() {
    return this.contents.length === 0;
  }
}
