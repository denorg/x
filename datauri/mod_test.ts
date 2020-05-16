import { assertEquals, posix, dirname } from "./test_deps.ts";
import { datauri } from "./mod.ts";

Deno.test("Datauri", async () => {
  assertEquals(
    await datauri(posix.join(dirname, "./test.gif")),
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "Should create datauri",
  );
});
