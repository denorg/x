import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { PriorityQueue } from "../priority-queue.ts";

Deno.test({
  name: "that an empty priority queue is empty",
  fn(): void {
    // 1. Arrange
    const expected = true;
    const pqueue = new PriorityQueue();
    // 2. Act
    const actual = pqueue.isEmpty();
    // 3. Assert
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "that an one item priority queue is not empty",
  fn(): void {
    // 1. Arrange
    const expected = false;
    const element = 10;
    const pqueue = new PriorityQueue();
    // 2. Act
    pqueue.enqueue(element);
    const actual = pqueue.isEmpty();
    // 3. Assert
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "that a dequeue successfully returns the single value",
  fn(): void {
    // 1. Arrange
    const element = 10;
    const expected = element;
    const pqueue = new PriorityQueue();
    pqueue.enqueue(element);
    // 2. Act
    const actual = pqueue.dequeue();
    // 3. Assert
    assertEquals(actual, expected);
    assertEquals(pqueue.isEmpty(), true);
  },
});

Deno.test({
  name: "that a empty dequeue successfully throws underflow",
  fn(): void {
    // 1. Arrange
    const element = 10;
    const expected = element;
    const pqueue = new PriorityQueue();
    // 2, 3. Act, Assert
    assertEquals(pqueue.isEmpty(), true);
    assertThrows(() => pqueue.dequeue());
  },
});

Deno.test({
  name: "that the default comparer returns number in correct order",
  fn(): void {
    // 1. Arrange
    const small = 1;
    const middle = 5;
    const big = 9;
    const pqueue = new PriorityQueue();
    pqueue.enqueue(middle);
    pqueue.enqueue(big);
    pqueue.enqueue(small);
    // 2. Act
    const actual_one = pqueue.dequeue();
    const actual_two = pqueue.dequeue();
    const actual_three = pqueue.dequeue();
    // 3. Assert
    assertEquals(actual_one, small);
    assertEquals(actual_two, middle);
    assertEquals(actual_three, big);
    assertEquals(pqueue.isEmpty(), true);
  },
});

Deno.test({
  name: "that the suplied comparer returns number in correct order",
  fn(): void {
    // 1. Arrange
    const small = 1;
    const middle = 5;
    const big = 9;
    const pqueue = new PriorityQueue<number>((item) => -item);
    pqueue.enqueue(middle);
    pqueue.enqueue(big);
    pqueue.enqueue(small);
    // 2. Act
    const actual_one = pqueue.dequeue();
    const actual_two = pqueue.dequeue();
    const actual_three = pqueue.dequeue();
    // 3. Assert
    assertEquals(actual_one, big);
    assertEquals(actual_two, middle);
    assertEquals(actual_three, small);
    assertEquals(pqueue.isEmpty(), true);
  },
});
