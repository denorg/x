# deno-libhydrogen

<p align="center">
  <img width="100%" src="https://raw.githubusercontent.com/chiefbiiko/deno-libhydrogen/master/deno_libhydrogen.png" alt="deno+libhydrogen logo" title="💧">
</p>

deno plugin 2 [`libhydrogen`](https://github.com/jedisct1/libhydrogen)

[![ci](https://github.com/chiefbiiko/deno-libhydrogen/workflows/ci/badge.svg?branch=master)](https://github.com/chiefbiiko/deno-libhydrogen/actions)

## import

``` ts
import * as hydro from "https://denopkg.com/chiefbiiko/deno-libhydrogen@v0.2.1/mod.ts";
```

or just import what you need

``` ts
import { hash } from "https://denopkg.com/chiefbiiko/deno-libhydrogen@v0.2.1/mod.ts";
```

## auto-loading prebuilts

during import the module searches a shared library for your os within the directory `./.deno_plugins` - configurable via environment variable `DENO_PLUGINS`. if the plugin can not be located a suitable prebuilt will be fetched from github releases.

## api

* [original libhydrogen docs](https://github.com/jedisct1/libhydrogen/wiki)
* [rust api docs](https://docs.rs/libhydrogen)

following [`rust-libhydrogen`'s](https://github.com/jedisct1/rust-libhydrogen) api amap

**diffs**

* `utils.pad(buf, blocksize)` and `utils.unpad(buf, blocksize)` do not modify `buf` in place - rather return a modified copy of `buf`

### namespaces

#### `random`

``` ts
export namespace random {
  export const SEEDBYTES: number = 32;

  export class Seed {
    public readonly bufferview: Uint8Array;
    constructor(raw_seed?: Uint8Array);
    public static gen(): Seed;
  }

  export function buf(out_len: number): Uint8Array;
  export function buf_deterministic(out_len: number, seed: Seed): Uint8Array;
  export function buf_deterministic_into(out: Uint8Array, seed: Seed): void;
  export function buf_into(out: Uint8Array): void;
  export function ratchet(): void;
  export function reseed(): void;
  export function u32(): number;
  export function uniform(upper_bound: number): number;
}
```

**example**

``` ts
const r: number = random.uniform(100);

const buf: Uint8Array = random.buf(r + 1);
```

#### `hash`

``` ts
export namespace hash {
  export const BYTES: number = 32;
  export const BYTES_MAX: number = 65535;
  export const BYTES_MIN: number = 16;
  export const CONTEXTBYTES: number = 8;
  export const KEYBYTES: number = 32;

  export class Context {
    public readonly bufferview: Uint8Array;
    constructor(raw_context: string | Uint8Array);
    public static create(raw_context: string | Uint8Array): Context;
  }

  export class Key {
    public readonly bufferview: Uint8Array;
    constructor(raw_key?: Uint8Array);
    public static gen(): Key;
  }

  export interface DefaultHasher {
    update(input: Uint8Array): DefaultHasher;
    finish(out_len: number): Uint8Array;
    finish_into(out: Uint8Array): void;
  }

  export function init(context: Context, key?: Key): DefaultHasher;
  export function hash(out_len: number, input: Uint8Array, context: Context, key?: Key): Uint8Array;
  export function hash_into(out: Uint8Array, input: Uint8Array, context: Context, key?: Key): void;
}
```

**example**

``` ts
const msg: Uint8Array = Uint8Array.from([65, 67, 65, 66]);
const context: hash.Context = hash.Context.create("examples");

const digest: Uint8Array = hash.hash(hash.BYTES, msg, context);
```

#### `kdf`

``` ts
export namespace kdf {
  export const BYTES_MAX: number = 65535;
  export const BYTES_MIN: number = 16;
  export const CONTEXTBYTES: number = 8;
  export const KEYBYTES: number = 32;

  export class Context {
    public readonly bufferview: Uint8Array;
    constructor(raw_context: string | Uint8Array);
    public static create(raw_context: string | Uint8Array): Context;
  }

  export class Key {
    public readonly bufferview: Uint8Array;
    constructor(raw_key?: Uint8Array);
    public static gen(): Key;
  }

  export function derive_from_key(subkey_len: number, subkey_id: bigint, context: Context, key: Key): Uint8Array;
}
```

**example**

``` ts
const context: kdf.Context = kdf.Context.create("examples");
const master_key: kdf.Key = kdf.Key.gen();

const subkey: Uint8Array = kdf.derive_from_key(32, 1n, context, master_key);
```

#### `secretbox`

``` ts
export namespace secretbox {
  export const CONTEXTBYTES: number = 8;
  export const HEADERBYTES: number = 36;
  export const KEYBYTES: number = 32;
  export const PROBEBYTES: number = 16;

  export class Context {
    public readonly bufferview: Uint8Array;
    constructor(raw_context: string | Uint8Array);
    public static create(raw_context: string | Uint8Array): Context;
  }

  export class Key {
    public readonly bufferview: Uint8Array;
    constructor(raw_key?: Uint8Array);
    public static gen(): Key;
  }

  export class Probe {
    public readonly bufferview: Uint8Array;
    constructor(input: Uint8Array, context: Context, key: Key);
    public static create(input: Uint8Array, context: Context, key: Key): Probe;
    public verify(input: Uint8Array, context: Context, key: Key): void;
  }

  export function decrypt(input: Uint8Array, msg_id: bigint, context: Context, key: Key): Uint8Array;
  export function encrypt(input: Uint8Array, msg_id: bigint, context: Context, key: Key): Uint8Array;
}
```

**note**

`secretbox.decrypt` throws if the ciphertext/tag is invalid

**example**

``` ts
const context: secretbox.Context = secretbox.Context.create("examples");
const key: secretbox.Key = secretbox.Key.gen();
const msg: Uint8Array = Uint8Array.from([65, 67, 65, 66]);

const ciphertext: Uint8Array = secretbox.encrypt(msg, 0n, context, key);
const plaintext: Uint8Array = secretbox.decrypt(ciphertext, 0n, context, key);
```

#### `sign`

``` ts
export namespace sign {
  export const BYTES: number = 64;
  export const CONTEXTBYTES: number = 8;
  export const PUBLICKEYBYTES: number = 32;
  export const SECRETKEYBYTES: number = 64;
  export const SEEDBYTES: number = 32;

  export class Context {
    public readonly bufferview: Uint8Array;
    constructor(raw_context: string | Uint8Array);
    public static create(raw_context: string | Uint8Array): Context;
  }

  export class KeyPair {
    public readonly public_key: PublicKey;
    public readonly secret_key: SecretKey;
    constructor(raw_public_key: Uint8Array, raw_secret_key: Uint8Array);
    public static gen(): KeyPair;
  }

  export class PublicKey {
    public readonly bufferview: Uint8Array;
    constructor(raw_public_key: Uint8Array);
  }

  export class SecretKey {
    public readonly bufferview: Uint8Array;
    constructor(raw_secret_key: Uint8Array);
  }

  export class Signature {
    public readonly bufferview: Uint8Array;
    constructor(raw_signature: Uint8Array);
  }

  export interface Sign {
    update(input: Uint8Array): Sign;
    finish_create(secret_key: SecretKey): Signature;
    finish_verify(signature: Signature, public_key: PublicKey): void;
  }

  export function init(context: Context): Sign;
  export function create(input: Uint8Array, context: Context, secret_key: SecretKey): Signature;
  export function verify(signature: Signature, input: Uint8Array, context: Context, public_key: PublicKey): void;
}
```

**note**

`sign.verify` and `Sign#finish_verify` throw if the signature is invalid

**example**

``` ts
const msg: Uint8Array = Uint8Array.from([65, 67, 65, 66]);

const context: sign.Context = sign.Context.create("example\0");
const keypair: sign.KeyPair = sign.KeyPair.gen();

const sig: sign.Signature = sign.create(msg, context, keypair.secret_key);

sign.verify(sig, msg, context, keypair.public_key);
```

#### `kx`

submodule bindings pending

#### `pwhash`

submodule bindings pending

#### `utils`

``` ts
export namespace utils {
  export function bin2hex(buf: Uint8Array): string;
  export function compare(a: Uint8Array, b: Uint8Array): number;
  export function equal(a: Uint8Array, b: Uint8Array): boolean;
  export function hex2bin(hex: string, ignore: string = ""): Uint8Array;
  export function increment(buf: Uint8Array): void;
  export function memzero(buf: Uint8Array): void;
  export function pad(buf: Uint8Array, blocksize: number): Uint8Array;
  export function unpad(buf: Uint8Array, blocksize: number): Uint8Array;
}
```

**example**

``` ts
const bin: Uint8Array = utils.hex2bin("abab");

utils.increment(bin);

const hex: string = utils.bin2hex(bin); // -> "acab"
```

#### `errors`

``` ts
export namespace errors {
  export class HydroError extends Error {
    constructor();
  }
}
```

**note**

the `errors.HydroError` constructor does not have a message parameter

#### `version`

``` ts
export namespace version {
  export function major(): number;
  export function minor(): number;
  export function string(): string;
}
```

**example**

``` ts
const major: number = version.major();
const minor: number = version.minor();
const v: string = version.string();
```

## security considerations

* module throws only `errors.HydroError` - its instances have a fixed uninformative bogus message - to avoid leakage

  * still there is `err.stack` - make sure not to expose it to the outside of your application

* `deno-libhydrogen` clears any internally allocated memory after use, both on `deno` and `rust` side, again - to avoid leakage

  * make sure to clear any secret memory owned by the parent application once you no longer need it, fx: `utils.memzero(keypair.secret_key.bufferview)`

## license

[MIT](./LICENSE)