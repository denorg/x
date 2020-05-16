import assert from '../index.ts'
// $ExpectError
assert<123>(456)
// $ExpectError
assert<number>(0, 1, '2', 3)
// $ExpectError
assert<object>({}, { abc: 'def' } as const, 'string')
