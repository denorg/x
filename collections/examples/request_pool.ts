import { promiseMap } from "../mod.ts";
import { Server, ServerRequest, delay, serve } from "./deps.ts";

async function handler(req: ServerRequest): Promise<void> {
  await delay(500);
  req.respond({ body: "Hello World\n" });
}

const s = serve({ port: 8000 });
promiseMap(s, handler, { concurrency: 3 });
