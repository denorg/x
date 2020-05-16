import { Counter } from "./mod.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test(function counter() {
  const letters = "a a a b b c".split(" ");
  const d = new Counter(letters);
  const arr = [...d.entries()];
  assertEquals(arr, [["a", 3], ["b", 2], ["c", 1]]);
});

Deno.test(function mostCommon() {
  const letters = "a a a b b c".split(" ");
  const d = new Counter(letters);
  const mc = d.mostCommon(2);
  const arr = [...mc.entries()];
  assertEquals(arr, [["a", 3], ["b", 2]]);
});
