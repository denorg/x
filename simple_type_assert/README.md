# Simple Type Assert

Simple type assertion library for Deno.

## Usage

```typescript
import assert from 'https://deno.land/x/simple_type_assert/index.ts'
assert<number>(0, 1, 2) // => passed
assert<number>('string') // => error
```

## License

[MIT](https://git.io/JvDdz) © [Hoàng Văn Khải](https://github.com/KSXGitHub)
