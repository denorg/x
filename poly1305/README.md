# poly1305

Poly1305 as defined by [RFC 8439](https://tools.ietf.org/html/rfc8439).

![ci](https://github.com/chiefbiiko/poly1305/workflows/ci/badge.svg)

## API

``` ts
export const OUTPUT_BYTES: number = 16;
export const KEY_BYTES: number = 32;

export function poly1305(
  out: Uint8Array,
  key: Uint8Array,
  msg: Uint8Array
): void;
```

`poly1305` does not do any input validation. Make sure the `out` and `key` arguments are of correct size.

## License

[MIT](./LICENSE)