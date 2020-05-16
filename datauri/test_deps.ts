export { assertEquals } from "https://deno.land/std@v0.50.0/testing/asserts.ts";
export { posix } from "https://deno.land/std@v0.50.0/path/mod.ts";
import { __ } from "https://deno.land/x/dirname/mod.ts";

export const dirname = __(import.meta).dirname;
