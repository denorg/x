import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { BinaryHeap } from "../binary-heap.ts";

Deno.test({
  name: "that an empty binary heap has zero length",
  fn(): void {
    // 1. Arrange
    const expected = 0;
    const bheap = new BinaryHeap();
    // 2. Act
    const actual = bheap.length;
    // 3. Assert
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "that an one item binary heap has length of one",
  fn(): void {
    // 1. Arrange
    const expected = 1;
    const element = 10;
    const bheap = new BinaryHeap();
    // 2. Act
    bheap.push(element);
    const actual = bheap.length;
    // 3. Assert
    assertEquals(actual, expected);
  },
});

Deno.test({
  name: "that a pop successfully returns the single value",
  fn(): void {
    // 1. Arrange
    const element = 10;
    const expected = element;
    const bheap = new BinaryHeap();
    bheap.push(element);
    // 2. Act
    const actual = bheap.pop();
    // 3. Assert
    assertEquals(actual, expected);
    assertEquals(bheap.length, 0);
  },
});

Deno.test({
  name: "that a empty pop successfully throws underflow",
  fn(): void {
    // 1. Arrange
    const element = 10;
    const expected = element;
    const bheap = new BinaryHeap();
    // 2, 3. Act, Assert
    assertEquals(bheap.length, 0);
    assertThrows(() => bheap.pop());
  },
});

Deno.test({
  name: "that the default comparer returns number in correct order",
  fn(): void {
    // 1. Arrange
    const small = 1;
    const middle = 5;
    const big = 9;
    const bheap = new BinaryHeap();
    bheap.push(middle);
    bheap.push(big);
    bheap.push(small);
    // 2. Act
    const actual_one = bheap.pop();
    const actual_two = bheap.pop();
    const actual_three = bheap.pop();
    // 3. Assert
    assertEquals(actual_one, small);
    assertEquals(actual_two, middle);
    assertEquals(actual_three, big);
    assertEquals(bheap.length, 0);
  },
});

Deno.test({
  name: "that the suplied comparer returns number in correct order",
  fn(): void {
    // 1. Arrange
    const small = 1;
    const middle = 5;
    const big = 9;
    const bheap = new BinaryHeap<number>((item) => -item);
    bheap.push(middle);
    bheap.push(big);
    bheap.push(small);
    // 2. Act
    const actual_one = bheap.pop();
    const actual_two = bheap.pop();
    const actual_three = bheap.pop();
    // 3. Assert
    assertEquals(actual_one, big);
    assertEquals(actual_two, middle);
    assertEquals(actual_three, small);
    assertEquals(bheap.length, 0);
  },
});
