# sha1

![ci](https://github.com/chiefbiiko/sha1/workflows/ci/badge.svg)

SHA1 for [`deno`](https://deno.land).

:warning: **SHA1 is not recommended anymore. Do not use it for any new applications/codebases.**

## Usage

``` ts
import { sha1 } from "https://denopkg.com/chiefbiiko/sha1/mod.ts";

console.log('SHA1 of ""', sha1("", "utf8", "hex"))
```

## API

#### `new SHA1()`

Creates a new SHA1 instance.

#### `SHA1#init(): SHA1`

Initializes a hash instance.

#### `SHA1#update(msg: string | Uint8Array, inputEncoding?: string): SHA1`

Updates a hash with additional data. `inputEncoding` can be one of `"utf8"`, `"hex"`, or `"base64"`.

#### `SHA1#digest(outputEncoding?: string): string | Uint8Array`

Obtain a digest of all the fed-in messages. `outputEncoding` can be one of `"utf8"`, `"hex"`, or `"base64"`. If it is omitted a `Uint8Array` gets returned.

#### `sha1(msg:string | Uint8Array, inputEncoding?: string, outputEncoding?: string): string | Uint8Array`

Convenience function for hashing singular data.

## License

[MIT](./LICENSE)
