import { promiseMap } from "../mod.ts";
import { assertEquals } from "../test_deps.ts";
import { Server, ServerRequest, delay, serve } from "./deps.ts";

async function handler(req: ServerRequest): Promise<void> {
  await delay(50);
  req.respond({ body: "Hello World\n" });
}

Deno.test(async function requestPool() {
  const s = serve({ port: 8000 });
  promiseMap(s, handler, { concurrency: 3 });
  let counter = 0;
  for (const i of [1, 2, 3, 4]) {
    fetch("http://localhost:8000").then(() => counter++);
  }
  await delay(90);
  assertEquals(counter, 3);
  s.close();
});
