#!/usr/bin/env deno --allow-read --allow-net

import { serveFile } from "https://deno.land/std/http/file_server.ts";
import { serve, Response } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 8000 });

console.log("http://localhost:8000/");

for await (const req of server) {
  let rsp: Response;
  try {
    if (req.url === "/") {
      rsp = await serveFile(req, "app/index.html");
    } else {
      rsp = await serveFile(req, `app/${req.url}`);
    }
  } catch (err) {
    console.error(req.url, err);
    rsp = await serveFile(req, "app/index.html");
  }

  req.respond(rsp);
}
