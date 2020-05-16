# chacha20-poly1305

![ci](https://github.com/chiefbiiko/chacha20-poly1305/workflows/ci/badge.svg)

ChaCha20-Poly1305 as defined by [RFC 8439](https://tools.ietf.org/html/rfc8439)

## API

``` ts
export const KEY_BYTES: number = 32;
export const NONCE_BYTES: number = 12;
export const PLAINTEXT_BYTES_MAX: bigint = 274877906880n;
export const CIPHERTEXT_BYTES_MAX: bigint = 274877906896n;
export const AAD_BYTES_MAX: bigint = 18446744073709551615n;
export const TAG_BYTES: number = 16;

export function seal(
  key: Uint8Array,
  nonce: Uint8Array,
  plaintext: Uint8Array,
  aad: Uint8Array
): null | { ciphertext: Uint8Array; tag: Uint8Array; aad: Uint8Array };

export function open(
  key: Uint8Array,
  nonce: Uint8Array,
  ciphertext: Uint8Array,
  aad: Uint8Array,
  receivedTag: Uint8Array
): null | Uint8Array;
```

## License

[MIT](./LICENSE)