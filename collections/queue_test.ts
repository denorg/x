import { Queue } from "./queue.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test(function queue() {
  const q: Queue<number> = [1, 2, 3];
  // assertEquals(q.peek(), 1);
  q.push(4);
  assertEquals(q.length!, 4);
  assertEquals(q.shift(), 1);
  assertEquals(q.shift(), 2);
  assertEquals(q.shift(), 3);
  assertEquals(q.shift(), 4);
  assertEquals(q.shift(), undefined);
  assertEquals(q.length!, 0);
});

// It's unclear if a Queue *should* be iterable
// perhaps it should instead be AsyncIterable?

// Deno.test(function queueIter() {
//   const q: Queue<number> = [1, 2, 3];
//   const arr = [...q];
//   assertEquals(arr, [1, 2, 3]);
// });
