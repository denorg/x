import { DeferredQueue } from "../mod.ts";
import { delay, ServerRequest, serve } from "./deps.ts";

// We create a dummy Connection class which has an async method we want to call
// Think of a database call
export class Connection {
  async foo(ms: number): Promise<string> {
    await delay(ms);
    return "ok";
  }
}

async function handler(req: ServerRequest, conn: Connection) {
  const result = await conn.foo(500);
  req.respond({ body: result });
}

const pool = new DeferredQueue<Connection>(
  { pool: [new Connection(), new Connection()] }
);
const s = serve({ port: 8000 });

for await (const req of s) {
  const conn: Connection = await pool.pop();
  handler(req, conn)
    .finally(() => pool.push(conn));
}
