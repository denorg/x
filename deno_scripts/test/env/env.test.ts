import { __, assertEquals, path } from "../../dev_deps.ts";
import { loadEnvFromFile, loadEnvFromObject } from "../../lib/env.ts";
import { fixDirnameWindows } from "../utils.ts";

let { __dirname } = __(import.meta);

__dirname = fixDirnameWindows(__dirname);

Deno.test("loads env from file", async () => {
  const dotEnvLocation = path.join(__dirname, ".env.test");

  const envObject = await loadEnvFromFile(dotEnvLocation);

  assertEquals(envObject, { HELLO_WORLD: "123" });
});

Deno.test("loads env from object", async () => {
  assertEquals(
    loadEnvFromObject({
      a: "a",
      b: 1,
      c: true,
    }),
    {
      a: "a",
      b: "1",
      c: "true",
    }
  );
});
