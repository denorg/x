import Docable from "../mod.ts";
import { runTests, test } from "https://deno.land/x/std/testing/mod.ts";
import * as asserts from "https://deno.land/x/std/testing/asserts.ts";
const decoder = new TextDecoder("utf-8");

export default {
  Docable,
  assert: {
    equal: asserts.assertEquals
  },
  decoder,
  runTests,
  test
};
