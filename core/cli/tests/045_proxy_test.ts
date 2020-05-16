// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { serve, ServerRequest } from "../../std/http/server.ts";
import { assertEquals } from "../../std/testing/asserts.ts";

const addr = Deno.args[1] || "127.0.0.1:4555";

async function proxyServer(): Promise<void> {
  const server = serve(addr);

  console.log(`Proxy server listening on http://${addr}/`);
  for await (const req of server) {
    proxyRequest(req);
  }
}

async function proxyRequest(req: ServerRequest): Promise<void> {
  console.log(`Proxy request to: ${req.url}`);
  const resp = await fetch(req.url, {
    method: req.method,
    headers: req.headers,
  });
  req.respond(resp);
}

async function testFetch(): Promise<void> {
  const c = Deno.run({
    cmd: [Deno.execPath(), "--reload", "--allow-net", "045_proxy_client.ts"],
    stdout: "piped",
    env: {
      HTTP_PROXY: `http://${addr}`,
    },
  });

  const status = await c.status();
  assertEquals(status.code, 0);
  c.close();
}

async function testModuleDownload(): Promise<void> {
  const http = Deno.run({
    cmd: [
      Deno.execPath(),
      "--reload",
      "cache",
      "http://localhost:4545/std/examples/colors.ts",
    ],
    stdout: "piped",
    env: {
      HTTP_PROXY: `http://${addr}`,
    },
  });

  const httpStatus = await http.status();
  assertEquals(httpStatus.code, 0);
  http.close();
}

proxyServer();
await testFetch();
await testModuleDownload();
Deno.exit(0);
