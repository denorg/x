# hchacha20

![ci](https://github.com/chiefbiiko/hchacha20/workflows/ci/badge.svg)

HChaCha20 PRF

Special-purpose hashing, such as X25519 key derivation, or XChacha20 initialization. If in doubt, do not use.

4 background see [djb's HSalsa20 paper](https://cr.yp.to/snuffle/xsalsa-20081128.pdf), and [the XChaCha20 IRTF CFRG draft](https://tools.ietf.org/html/draft-irtf-cfrg-xchacha-01#section-2.2).

## API

``` ts
export const OUTPUT_BYTES: number = 32;
export const KEY_BYTES: number = 32;
export const NONCE_BYTES: number = 16;
export const CONSTANT_BYTES: number = 16;

export function hchacha20(
  out: Uint8Array,
  key: Uint8Array,
  nonce: Uint8Array,
  constant?: Uint8Array
): void;
```

## License

[MIT](./LICENSE)
