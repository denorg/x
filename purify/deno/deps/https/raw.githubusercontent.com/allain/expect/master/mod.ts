import { test } from "https://deno.land/std/testing/mod.ts";
import * as m from "./mock.ts";
export const mock = m;

export * from "./expect.ts";
export function it(name: string, fn: () => void | Promise<void>) {
  test({
    name,
    fn
  });
}
