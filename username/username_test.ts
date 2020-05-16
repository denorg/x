import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { cleanWindowsCommand, makeUsernameFromId } from "./utils.ts";

Deno.test({
  name: "cleanWindowsCommand",
  fn(): void {
    assertEquals(cleanWindowsCommand("foo\\bar"), "bar");
  },
});

Deno.test({
  name: "makeUsernameFromId",
  fn(): void {
    assertEquals(makeUsernameFromId("123"), "no-username-123");
  },
});
