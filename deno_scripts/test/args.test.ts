import { assertEquals } from "../dev_deps.ts";
import {
  argifyArgs,
  argifyTsconfig,
  argifyImportMap,
  argifyUnstable,
} from "../lib/args.ts";

Deno.test("argifies args", () => {
  // All as strings
  assertEquals(argifyArgs("a b c d", "e f g"), [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
  ]);

  // All as string list
  assertEquals(argifyArgs(["a", "b"], ["c"]), ["a", "b", "c"]);
});

Deno.test("argifies tsconfig", () => {
  assertEquals(argifyTsconfig("tsconfig.json", "tsconfig.other.json"), [
    "-c",
    "tsconfig.json",
  ]);

  assertEquals(argifyTsconfig("tsconfig.local.json", "tsconfig.other.json"), [
    "-c",
    "tsconfig.local.json",
  ]);

  assertEquals(argifyTsconfig(undefined, "tsconfig.other.json"), [
    "-c",
    "tsconfig.other.json",
  ]);
});

Deno.test("argifies import map", () => {
  assertEquals(argifyImportMap(undefined), []);
  assertEquals(argifyImportMap("importmap.json"), [
    "--importmap",
    "importmap.json",
  ]);
});

Deno.test("argifies unstable", () => {
  assertEquals(argifyUnstable(undefined), []);
  assertEquals(argifyUnstable(true), ["--unstable"]);
});
