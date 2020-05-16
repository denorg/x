import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { validate } from '../mod.ts'

Deno.test("validate succeeds", () => {
  const expected = validate('4242424242424242')
  assertEquals(expected, true)
})

Deno.test("validate fails", () => {
  const expected = validate('4142424242424242')
  assertEquals(expected, false)
})