import { assertEquals } from 'https://deno.land/std@0.51.0/testing/asserts.ts'
import { load, dump } from './js-yaml.js'

Deno.test('load', () => {
  assertEquals(
    load('{ abc: 123, def: 456 }'),
    { abc: 123, def: 456 }
  )
})

Deno.test('dump', () => {
  assertEquals(
    dump({ abc: 123, def: 456 }, { flowLevel: 0 }).trim(),
    '{abc: 123, def: 456}'
  )
})

Deno.test('window.jsyaml', async () => {
  assertEquals(window.jsyaml, await import('./js-yaml.js'))
})
