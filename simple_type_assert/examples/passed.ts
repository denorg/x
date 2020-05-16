import assert from '../index.ts'
assert<123>(123)
assert<number>(0, 1, 2, 3)
assert<object>({}, { abc: 'def' } as const)
