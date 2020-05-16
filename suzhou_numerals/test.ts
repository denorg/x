import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { encode, decode } from "./mod.ts";

const examples: [string, string][] = [
  ["123", "〡二〣"],
  ["21", "〢一"],
  ["4022", "〤〇〢二"],
  ["4312", "〤〣一〢"],
  ["1922", "〡〩〢二"],
  ["85", "〨〥"],
  ["342", "〣〤〢"],
  ["98", "〩〨"],
  ["7", "〧"],
  ["10", "〡〇"],
  ["1", "〡"],
];

Deno.test("encode & decode", () => {
  for (const e of examples) {
    assertEquals(encode(e[0]), e[1]);
    assertEquals(decode(e[1]), e[0]);
  }
});
