import { Deque, FullError } from "./mod.ts";
import { assertEquals, assertThrows } from "./test_deps.ts";

Deno.test(function deque() {
  const d = new Deque({ size: 3, it: [1, 2, 3] });
  // assertEquals(s.peek(), 3);
  d.push(4);
  assertEquals(d.length, 3);
  assertEquals(d.pop(), 4);
  assertEquals(d.pop(), 3);
  assertEquals(d.pop(), 2);
  assertEquals(d.pop(), undefined);
  assertEquals(d.length, 0);
});

Deno.test(function dequeIter() {
  const d = new Deque({ size: 2, it: [1, 2, 3] });
  const arr = [...d];
  assertEquals(arr, [2, 3]);
});

Deno.test(function dequeFull() {
  const d = new Deque({ size: 3, it: [1, 2, 3], throwIfFull: true });
  // assertEquals(s.peek(), 3);
  assertThrows(() => d.push(4), FullError);
  assertEquals(d.length, 3);
});
