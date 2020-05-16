import { assertEquals } from "https://deno.land/std@v0.34.0/testing/asserts.ts";
import { md5 } from "./mod.ts";

const strings = [
  {
    string: "The quick brown fox jumps over the lazy dog",
    hash: "9e107d9d372bb6826bd81d3542a419d6",
  },
  {
    string: "Test vector from febooti.com",
    hash: "500ab6613c6db7fbd30c62f5ff573d0f",
  },
  { string: "", hash: "d41d8cd98f00b204e9800998ecf8427e" },
  { string: "test", hash: "098f6bcd4621d373cade4e832627b4f6" },
  { string: "password", hash: "5f4dcc3b5aa765d61d8327deb882cf99" },
];

strings.forEach(({ string, hash }) =>
  Deno.test({
    name: string || "Empty",
    fn(): void {
      assertEquals(md5(string), hash);
    },
  })
);

// Tests with Uint8Array
const uint8 = new Uint8Array([116, 101, 115, 116]);

Deno.test({
  name: "Uint8Array",
  fn(): void {
    assertEquals(md5(uint8), "098f6bcd4621d373cade4e832627b4f6");
  },
});
