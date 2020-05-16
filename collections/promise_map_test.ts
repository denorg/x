import { delay } from "./deps.ts";
import { assert } from "./test_deps.ts";
import { promiseMap } from "./mod.ts";

// TODO add multiple tests! including a success...
Deno.test(async function pmap() {
  const startTime = +new Date();
  let caught: boolean = false;
  await promiseMap(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    async (i) => {
      await delay(50);
      if (i === 7) throw new Error();
    },
    { concurrency: 3 }
  ).catch(err => {
    caught = true;
  });
  const elapsed = (+new Date()) - startTime;
  assert(elapsed > 150);
  assert(caught);
});
