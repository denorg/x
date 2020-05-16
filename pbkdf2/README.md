# pbkdf2

[![Travis](http://img.shields.io/travis/chiefbiiko/pbkdf2.svg?style=flat)](http://travis-ci.org/chiefbiiko/pbkdf2) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/pbkdf2?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/pbkdf2)

Password-Based Key Derivation Function 2

> ⚠️ PBKDF2 is obsolete - check out [alternatives](https://en.wikipedia.org/wiki/PBKDF2#Alternatives_to_PBKDF2)

## Usage

``` ts
import { pbkdf2 } from "https://denopkg.com/chiefbiiko/pbkdf2/mod.ts";

console.log("PBKDF2 HMAC-SHA256 example", pbkdf2("sha256", "password", "salt"));
```

## API

Prep: a generic representation of a keyed hash algorithm implementation.

``` ts
export interface KeyedHash {
  hashSize: number;
  init(key: Uint8Array): KeyedHash;
  update(msg: Uint8Array, inputEncoding?: string): KeyedHash;
  digest(outputEncoding?: string): string | Uint8Array;
}
```

#### `new PBKDF2(hmac: KeyedHash, rounds: number = 10000)`

Creates a new PBKDF2 instance. `hmac` must be keyed hash conforming to above interface, fx [`hmac`](https://github.com/chiefbiiko/hmac).

#### `PBKDF2#derive(password: string | Uint8Array, salt: string | Uint8Array, length?: number, inputEncoding?: string, outputEncoding?: string): string | Uint8Array`

Derives a key from given password and salt. The `length` parameter can be used to control the byte length of the derived key. It defaults to a half of the byte length of the given keyed hash's digest. `inputEncoding` can be either `null`, in which case the `password` and `salt` are treated as binary input, or one of `"utf8"`, `"hex"`, `"base64"`. The same applies to `outputEncoding`.

#### `pbkdf2(hash: string, password: string | Uint8Array, salt: string | Uint8Array, inputEncoding?: string, outputEncoding?: string, length?: number, rounds: number = 10000): string | Uint8Array`

Convenience function for deriving a key from a password and salt. `hash` should be one of `"sha1"`, `"sha256"`, or `"sha512"`, with the last two representing the respective SHA2 variants. The `length` parameter can be used to control the byte length of the derived key, whereas the `rounds` parameter controls the number of iterations. `length` defaults to a half of the byte length of the given keyed hash's digest. See above for possible values for the `*encoding` parameters.

## Note

[RFC 8018](https://tools.ietf.org/html/rfc8018) recommends a salt length of at least 64 bits, whereas NIST recommends 128 bits. The `rounds` parameter of the constructor and the convenience function in this module defaults to `10000`, indicating the number of derivation iterations. Check out the [RFC](https://tools.ietf.org/html/rfc8018#section-4) for more security considerations with regard to the salt and iteration count.

## License

[MIT](./LICENSE)
