import { assertEquals } from 'https://deno.land/std@v0.38.0/testing/asserts.ts'
import { readFileStrSync } from 'https://deno.land/std@v0.38.0/fs/mod.ts'
import { join } from 'https://deno.land/std@v0.38.0/path/mod.ts'
import { dirname } from 'https://deno.land/x/dirname/mod.ts'
import { safeLoad } from 'https://deno.land/x/js_yaml_port@3.13.1/js-yaml.js'
import { pass } from 'https://cdn.pika.dev/@tsfun/pipe/0.0.14'
import multipleArguments from '../lib/index.ts'

const cases: readonly {
  readonly input: readonly string[]
  readonly output: string
}[] = pass(import.meta)
  .to(dirname)
  .to(join, 'cases.yaml')
  .to(readFileStrSync)
  .to(safeLoad)
  .get()

cases.forEach(({ input, output }) => Deno.test(Deno.inspect(input), () => {
  const actual = multipleArguments(input)
  assertEquals(actual, output)
}))
