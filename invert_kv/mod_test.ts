import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { invert } from "./mod.ts";

Deno.test("invert", async (): Promise<void> => {
  assertEquals(invert({ hello: "world" }), { world: "hello" });
});
