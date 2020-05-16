/**
 * Assert whether a value satisfies a type
 * @template X Type to test
 * @param x Value to test against `X`
 * @param xs Other values to test against `X`
 * @example
 *   import assert from 'https://deno.land/x/simple_type_assert/index.ts'
 *   assert<number>(0, 1, 2) // => passed
 *   assert<number>('string') // => error
 */
export function assert<X> (x: X, ...xs: X[]): void {}
export default assert
