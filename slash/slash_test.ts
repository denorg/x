import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import slash from "./mod.ts";

Deno.test({
  name: "convert backwards-slash paths to forward slash paths",
  fn(): void {
    assertEquals(slash("c:/aaaa\\bbbb"), "c:/aaaa/bbbb");
    assertEquals(slash("c:\\aaaa\\bbbb"), "c:/aaaa/bbbb");
  },
});

Deno.test({
  name: "not convert extended-length paths",
  fn(): void {
    const path = "\\\\?\\c:\\aaaa\\bbbb";
    assertEquals(slash(path), path);
  },
});

Deno.test({
  name: "not convert paths with Unicode",
  fn(): void {
    const path = "c:\\aaaa\\bbbb\\★";
    assertEquals(slash(path), path);
  },
});
