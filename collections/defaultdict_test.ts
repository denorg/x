import { DefaultDict } from "./mod.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test(function defaultdict() {
  const d = new DefaultDict(0);
  assertEquals(d.get("a"), 0);
  const letters = "a a a b b c".split(" ");
  for (const ch of letters) {
    d.set(ch, d.get(ch) + 1);
  }
  const arr = [...d.entries()];
  assertEquals(arr, [["a", 3], ["b", 2], ["c", 1]]);
});
