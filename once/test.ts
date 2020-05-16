import { assertStrictEq } from 'https://deno.land/std@v0.35.0/testing/asserts.ts'
import DEFAULT, { once } from './index.js'

Deno.test('default export', () => {
  assertStrictEq(once, DEFAULT)
})

function setup () {
  let count = 0
  const expected = Symbol('expected')
  function inFn () {
    count += 1
    return expected
  }
  const outFn = once(inFn)
  return {
    getCount: () => count,
    expected,
    inFn,
    outFn
  }
}

Deno.test('output function returns result of input function', () => {
  const { expected, outFn } = setup()
  assertStrictEq(outFn(), expected)
})

Deno.test('result stays the same even if input function is changing', () => {
  let value: any = Symbol('first')
  function inFn () {
    const result = value
    value = [value]
    return result
  }
  const outFn = once(inFn)
  assertStrictEq(outFn(), outFn())
  assertStrictEq(outFn(), outFn())
  assertStrictEq(outFn(), outFn())
})

Deno.test('not calling output function → not calling input function', () => {
  const { getCount } = setup()
  assertStrictEq(getCount(), 0)
})

Deno.test('calling output function once → calling input function once ', () => {
  const { getCount, outFn } = setup()
  outFn()
  assertStrictEq(getCount(), 1)
})

Deno.test('calling output function multiple times → calling input function once ', () => {
  const { getCount, outFn } = setup()
  outFn()
  outFn()
  outFn()
  outFn()
  assertStrictEq(getCount(), 1)
})
