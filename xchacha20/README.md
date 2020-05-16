# xchacha20

![ci](https://github.com/chiefbiiko/xchacha20/workflows/ci/badge.svg)

XChaCha20 as defined by [the XChaCha20 IRTF CFRG draft](https://tools.ietf.org/html/draft-irtf-cfrg-xchacha-01).

## API

``` ts
export const KEY_BYTES: number = 32;
export const NONCE_BYTES: number = 24;

export function xchacha20(
  out: Uint8Array,
  key: Uint8Array,
  nonce: Uint8Array,
  counter: number,
  text: Uint8Array
): void;
```

`xchacha20` does not do any input validation. Make sure `key` and `nonce` have correct sizes and that `counter` is an `uint32`. Also, guarantee that `out.byteLength === text.byteLength`.

## License

[MIT](./LICENSE)