import { Stack } from "./mod.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test(function stack() {
  const s: Stack<number> = [1, 2, 3];
  // assertEquals(s.peek(), 3);
  s.push(4);
  assertEquals(s.length!, 4);
  assertEquals(s.pop(), 4);
  assertEquals(s.pop(), 3);
  assertEquals(s.pop(), 2);
  assertEquals(s.pop(), 1);
  assertEquals(s.pop(), undefined);
  assertEquals(s.length!, 0);
});

// See comment in ./queue_test.ts
// Deno.test(function stackIter() {
//   const s: Stack<number> = [1, 2, 3];
//   const arr = [...s];
//   assertEquals(arr, [3, 2, 1]);
// });
