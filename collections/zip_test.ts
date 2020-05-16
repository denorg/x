import { zip, asyncZip } from "./mod.ts";
import { from } from "./util.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test(async function zipping() {
  assertEquals([...zip([1, 2, 3], [4, 5])], [[1, 4], [2, 5]]);

  const ait1: AsyncIterable<number> = from<number>([1, 2, 3]);
  const ait2: AsyncIterable<number> = from<number>([5, 6]);
  const res: number[] = [];
  for await (const [a, b] of await asyncZip(ait1, ait2)) {
    res.push(a + b);
  }
  assertEquals(res, [6, 8]);
});
