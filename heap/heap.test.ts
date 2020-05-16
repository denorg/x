import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { Heap, MinHeap, MaxHeap, IComparator } from "./heap.ts";

export const testDefinitions: Array<Deno.TestDefinition> = [
  {
    name: "can build MinHeap",
    fn(): void {
      let heap = MinHeap([3, 1, 2]);
      assertEquals(Boolean(heap), true);
      assertEquals(heap.length, 3);
      assertEquals(heap.pop(), 1);
    },
  },
  {
    name: "can peek() min value",
    fn(): void {
      let heap = MinHeap();
      assertEquals(Boolean(heap), true);
      heap.push(3);
      heap.push(1);
      heap.push(2);
      assertEquals(heap.peek(), 1);
    },
  },
  {
    name: "can push(val) values",
    fn(): void {
      let heap = MinHeap([4]);
      assertEquals(Boolean(heap), true);
      heap.push(3);
      heap.push(1);
      heap.push(2);
      assertEquals(heap.length, 4);
      assertEquals(heap.peek(), 1);
    },
  },
  {
    name: "can pop() min value",
    fn(): void {
      let heap = MinHeap();
      assertEquals(Boolean(heap), true);
      heap.push(3);
      heap.push(1);
      heap.push(32);
      heap.push(2);
      heap.push(31);
      heap.push(33);
      assertEquals(heap.pop(), 1);
      assertEquals(heap.peek(), 2);
      assertEquals(heap.pop(), 2);
    },
  },

  /**
   * Max Heap
   */
  {
    name: "Can build a MaxHeap",
    fn() {
      const initialValues = [3, 4, 5, 2];
      let heap = MaxHeap(initialValues);
      assertEquals(heap.length, 4);
      assertEquals(heap.pop(), 5);
      heap.push(7);
      heap.push(1);
      assertEquals(heap.pop(), 7);
      assertEquals(heap.pop(), 4);
    },
  },

  /**
   * Custom comparator Heap
   */
  {
    name: "Can build a weird heap with custom comparator",
    fn() {
      // we'll make a heap whose values are arrays of whatever.
      // and sorted by array length in ascending order
      let a1 = [null];
      let a2 = [1, "2"];
      let a3 = [false, () => {}, new Date()];
      const arrayLengthComparator: IComparator<Array<any>> = (a, b) =>
        a.length - b.length;
      let heap = Heap(arrayLengthComparator);
      heap.push(a2);
      heap.push(a1);
      heap.push(a3);
      assertEquals(heap.pop(), a1);
      assertEquals(heap.pop(), a2);
      assertEquals(heap.pop(), a3);
    },
  },
];

if ((typeof Deno !== "undefined") && (typeof Deno.test === "function")) {
  testDefinitions.forEach(Deno.test);
}
