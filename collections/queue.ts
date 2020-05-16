/*
 * Queue is a first-in-first-out data structure.
 * Queue supports `push` to add to the end and `shift` to remove form the front.
 *
 *      const q: Queue = [1, 2, 3]
 *      console.log(q.shift())  // 1
 *
 */

export interface Queue<T> {
  shift(): T | undefined;
  push(value: T): void;
  length?: number;
}
