import { runTests, test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import printer from './printer.ts'

test({
  name: 'Returns valid greeting.',
  fn(): void {
    const { isValid } = printer()
    assertEquals(isValid, true)
  }
})

runTests()