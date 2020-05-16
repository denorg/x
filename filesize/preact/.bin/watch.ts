#!/usr/bin/env deno --allow-read --allow-run

import { debounce } from "./debounce.ts";

async function bundle() {
  const p = Deno.run({
    cmd: [
      "make",
      "bundle",
    ],
  });

  return p.status();
}

console.log("Watching....");

const debounced = debounce(bundle, 200);
const paths = ["app/app.ts", "app/components"];

for await (const event of Deno.watchFs(paths)) {
  console.log(event, Date.now());
  debounced();
}
