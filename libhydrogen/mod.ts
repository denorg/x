import { plugin } from "./lib.ts";

const decoder: TextDecoder = new TextDecoder();
const encoder: TextEncoder = new TextEncoder();

const ZERO_BUF: Uint8Array = new Uint8Array(0);

function check(
  signal: null | Uint8Array,
  ...cleanup: Uint8Array[]
): Uint8Array {
  if (!signal || signal.byteLength === 0) {
    cleanup.forEach(utils.memzero);

    throw new errors.HydroError();
  }

  return signal;
}

export namespace random {
  export const SEEDBYTES: number = 32;

  export class Seed {
    public readonly bufferview: Uint8Array;

    constructor(raw_seed?: Uint8Array) {
      if (raw_seed) {
        if (raw_seed.byteLength !== SEEDBYTES) {
          throw new errors.HydroError();
        }

        this.bufferview = raw_seed;
      } else {
        this.bufferview = buf(SEEDBYTES);
      }
    }

    public static gen(): Seed {
      return new Seed();
    }
  }

  export function buf(out_len: number): Uint8Array {
    const control: Uint8Array = new Uint8Array(2);

    control[0] = (out_len >> 8) & 0xff;
    control[1] = out_len & 0xff;

    const buf: Uint8Array = check(
      plugin.ops.random_buf.dispatch(control),
      control
    );

    utils.memzero(control);

    return buf;
  }

  export function buf_deterministic(
    out_len: number,
    seed: Seed
  ): Uint8Array {
    const control: Uint8Array = new Uint8Array(2 + SEEDBYTES);

    control[0] = (out_len >> 8) & 0xff;
    control[1] = out_len & 0xff;

    control.set(seed.bufferview, 2);

    const buf: Uint8Array = check(
      plugin.ops.random_buf_deterministic.dispatch(control),
      control
    );

    utils.memzero(control);

    return buf;
  }

  export function buf_deterministic_into(
    out: Uint8Array,
    seed: Seed
  ): void {
    check(
      plugin.ops.random_buf_deterministic_into.dispatch(seed.bufferview, out)
    );
  }

  export function buf_into(out: Uint8Array): void {
    check(plugin.ops.random_buf_into.dispatch(ZERO_BUF, out));
  }

  export function ratchet(): void {
    check(plugin.ops.random_ratchet.dispatch(ZERO_BUF));
  }

  export function reseed(): void {
    check(plugin.ops.random_reseed.dispatch(ZERO_BUF));
  }

  export function u32(): number {
    const buf: Uint8Array = check(plugin.ops.random_u32.dispatch(ZERO_BUF));

    const r: number = (buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3];

    utils.memzero(buf);

    return r;
  }

  export function uniform(upper_bound: number): number {
    const control: Uint8Array = new Uint8Array(4);

    control[0] = (upper_bound >> 24) & 0xff;
    control[1] = (upper_bound >> 16) & 0xff;
    control[2] = (upper_bound >> 8) & 0xff;
    control[3] = upper_bound & 0xff;

    const buf: Uint8Array = check(
      plugin.ops.random_uniform.dispatch(control),
      control
    );

    utils.memzero(control);

    const r: number = (buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3];

    utils.memzero(buf);

    return r;
  }
}

export namespace hash {
  export const BYTES: number = 32;
  export const BYTES_MAX: number = 65535;
  export const BYTES_MIN: number = 16;
  export const CONTEXTBYTES: number = 8;
  export const KEYBYTES: number = 32;

  export class Context {
    public readonly bufferview: Uint8Array;

    constructor(raw_context: string | Uint8Array) {
      if (raw_context.length !== CONTEXTBYTES) {
        throw new errors.HydroError();
      }

      if (typeof raw_context === "string") {
        raw_context = encoder.encode(raw_context);
      }

      this.bufferview = raw_context;
    }

    public static create(raw_context: string | Uint8Array): Context {
      return new Context(raw_context);
    }
  }

  export class Key {
    public readonly bufferview: Uint8Array;

    constructor(raw_key?: Uint8Array) {
      if (raw_key) {
        if (raw_key.byteLength !== KEYBYTES) {
          throw new errors.HydroError();
        }

        this.bufferview = raw_key;
      } else {
        this.bufferview = check(plugin.ops.hash_key_gen.dispatch(ZERO_BUF));
      }
    }

    public static gen(): Key {
      return new Key();
    }
  }

  export interface DefaultHasher {
    update(input: Uint8Array): DefaultHasher;
    finish(out_len: number): Uint8Array;
    finish_into(out: Uint8Array): void;
  }

  class DefaultHasherImpl implements DefaultHasher {
    // 4-byte cross-lang identifier
    private readonly id: Uint8Array;

    constructor(context: Context, key?: Key) {
      const control: Uint8Array = new Uint8Array(KEYBYTES + CONTEXTBYTES);

      if (key) {
        control.set(key.bufferview, 0);
      }

      control.set(context.bufferview, KEYBYTES);

      this.id = check(plugin.ops.hash_init.dispatch(control), control);

      utils.memzero(control);
    }

    public update(input: Uint8Array): DefaultHasher {
      check(plugin.ops.hash_defaulthasher_update.dispatch(this.id, input));

      return this;
    }

    public finish(out_len: number): Uint8Array {
      const control: Uint8Array = new Uint8Array(4 + 2);

      control.set(this.id, 0);

      control[4] = (out_len >> 8) & 0xff;
      control[5] = out_len & 0xff;

      const buf: Uint8Array = check(
        plugin.ops.hash_defaulthasher_finish.dispatch(control),
        control
      );

      utils.memzero(control);

      return buf;
    }

    public finish_into(out: Uint8Array): void {
      check(plugin.ops.hash_defaulthasher_finish_into.dispatch(this.id, out));
    }
  }

  export function init(context: Context, key?: Key): DefaultHasher {
    return new DefaultHasherImpl(context, key);
  }

  export function hash(
    out_len: number,
    input: Uint8Array,
    context: Context,
    key?: Key
  ): Uint8Array {
    const control: Uint8Array = new Uint8Array(2 + KEYBYTES + CONTEXTBYTES);

    control[0] = (out_len >> 8) & 0xff;
    control[1] = out_len & 0xff;

    if (key) {
      control.set(key.bufferview, 2);
    }

    control.set(context.bufferview, 2 + KEYBYTES);

    const digest: Uint8Array = check(
      plugin.ops.hash_hash.dispatch(control, input),
      control
    );

    utils.memzero(control);

    return digest;
  }

  export function hash_into(
    out: Uint8Array,
    input: Uint8Array,
    context: Context,
    key?: Key
  ): void {
    const control: Uint8Array = new Uint8Array(
      KEYBYTES + CONTEXTBYTES + input.byteLength
    );

    if (key) {
      control.set(key.bufferview, 0);
    }

    control.set(context.bufferview, KEYBYTES);

    control.set(input, KEYBYTES + CONTEXTBYTES);

    check(plugin.ops.hash_hash_into.dispatch(control, out), control);

    utils.memzero(control);
  }
}

export namespace errors {
  export class HydroError extends Error {
    constructor() {
      super("💧");

      Object.setPrototypeOf(this, HydroError.prototype);
    }
  }
}

export namespace kdf {
  export const BYTES_MAX: number = 65535;
  export const BYTES_MIN: number = 16;
  export const CONTEXTBYTES: number = 8;
  export const KEYBYTES: number = 32;

  export class Context {
    public readonly bufferview: Uint8Array;

    constructor(raw_context: string | Uint8Array) {
      if (raw_context.length !== CONTEXTBYTES) {
        throw new errors.HydroError();
      }

      if (typeof raw_context === "string") {
        raw_context = encoder.encode(raw_context);
      }

      this.bufferview = raw_context;
    }

    public static create(raw_context: string | Uint8Array): Context {
      return new Context(raw_context);
    }
  }

  export class Key {
    public readonly bufferview: Uint8Array;

    constructor(raw_key?: Uint8Array) {
      if (raw_key) {
        if (raw_key.byteLength !== KEYBYTES) {
          throw new errors.HydroError();
        }

        this.bufferview = raw_key;
      } else {
        this.bufferview = check(plugin.ops.kdf_key_gen.dispatch(ZERO_BUF));
      }
    }

    public static gen(): Key {
      return new Key();
    }
  }

  export function derive_from_key(
    subkey_len: number,
    subkey_id: bigint,
    context: Context,
    key: Key
  ): Uint8Array {
    const control: Uint8Array = new Uint8Array(
      KEYBYTES + CONTEXTBYTES + 2 + 8
    );

    control.set(key.bufferview, 0);

    control.set(context.bufferview, KEYBYTES);

    control[KEYBYTES + CONTEXTBYTES] = (subkey_len >> 8) & 0xff;
    control[KEYBYTES + CONTEXTBYTES + 1] = subkey_len & 0xff;

    control[KEYBYTES + CONTEXTBYTES + 2] = Number((subkey_id >> 56n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 3] = Number((subkey_id >> 48n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 4] = Number((subkey_id >> 40n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 5] = Number((subkey_id >> 32n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 6] = Number((subkey_id >> 24n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 7] = Number((subkey_id >> 16n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 8] = Number((subkey_id >> 8n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 9] = Number(subkey_id & 0xffn);

    const subkey: Uint8Array = check(
      plugin.ops.kdf_derive_from_key.dispatch(control),
      control
    );

    utils.memzero(control);

    return subkey;
  }
}

export namespace secretbox {
  export const CONTEXTBYTES: number = 8;
  export const HEADERBYTES: number = 36;
  export const KEYBYTES: number = 32;
  export const PROBEBYTES: number = 16;

  export class Context {
    public readonly bufferview: Uint8Array;

    constructor(raw_context: string | Uint8Array) {
      if (raw_context.length !== CONTEXTBYTES) {
        throw new errors.HydroError();
      }

      if (typeof raw_context === "string") {
        raw_context = encoder.encode(raw_context);
      }

      this.bufferview = raw_context;
    }

    public static create(raw_context: string | Uint8Array): Context {
      return new Context(raw_context);
    }
  }

  export class Key {
    public readonly bufferview: Uint8Array;

    constructor(raw_key?: Uint8Array) {
      if (raw_key) {
        if (raw_key.byteLength !== KEYBYTES) {
          throw new errors.HydroError();
        }

        this.bufferview = raw_key;
      } else {
        this.bufferview = check(
          plugin.ops.secretbox_key_gen.dispatch(ZERO_BUF)
        );
      }
    }

    public static gen(): Key {
      return new Key();
    }
  }

  export class Probe {
    public readonly bufferview: Uint8Array;

    constructor(input: Uint8Array, context: Context, key: Key) {
      const control: Uint8Array = new Uint8Array(KEYBYTES + CONTEXTBYTES);

      control.set(key.bufferview, 0);

      control.set(context.bufferview, KEYBYTES);

      this.bufferview = check(
        plugin.ops.secretbox_probe_create.dispatch(control, input),
        control
      );

      utils.memzero(control);
    }

    public static create(
      input: Uint8Array,
      context: Context,
      key: Key
    ): Probe {
      return new Probe(input, context, key);
    }

    public verify(input: Uint8Array, context: Context, key: Key): void {
      const control: Uint8Array = new Uint8Array(
        this.bufferview.byteLength + KEYBYTES + CONTEXTBYTES
      );

      control.set(this.bufferview, 0);

      control.set(key.bufferview, PROBEBYTES);

      control.set(context.bufferview, PROBEBYTES + KEYBYTES);

      check(
        plugin.ops.secretbox_probe_verify.dispatch(control, input),
        control
      );

      utils.memzero(control);
    }
  }

  export function decrypt(
    input: Uint8Array,
    msg_id: bigint,
    context: Context,
    key: Key
  ): Uint8Array {
    if (input.byteLength === 0) {
      throw new errors.HydroError();
    }

    const control: Uint8Array = new Uint8Array(KEYBYTES + CONTEXTBYTES + 8);

    control.set(key.bufferview, 0);

    control.set(context.bufferview, KEYBYTES);

    control[KEYBYTES + CONTEXTBYTES] = Number((msg_id >> 56n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 1] = Number((msg_id >> 48n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 2] = Number((msg_id >> 40n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 3] = Number((msg_id >> 32n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 4] = Number((msg_id >> 24n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 5] = Number((msg_id >> 16n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 6] = Number((msg_id >> 8n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 7] = Number(msg_id & 0xffn);

    const plaintext: Uint8Array = check(
      plugin.ops.secretbox_decrypt.dispatch(control, input),
      control
    );

    utils.memzero(control);

    return plaintext;
  }

  export function encrypt(
    input: Uint8Array,
    msg_id: bigint,
    context: Context,
    key: Key
  ): Uint8Array {
    if (input.byteLength === 0) {
      throw new errors.HydroError();
    }

    const control: Uint8Array = new Uint8Array(KEYBYTES + CONTEXTBYTES + 8);

    control.set(key.bufferview, 0);

    control.set(context.bufferview, KEYBYTES);

    control[KEYBYTES + CONTEXTBYTES] = Number((msg_id >> 56n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 1] = Number((msg_id >> 48n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 2] = Number((msg_id >> 40n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 3] = Number((msg_id >> 32n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 4] = Number((msg_id >> 24n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 5] = Number((msg_id >> 16n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 6] = Number((msg_id >> 8n) & 0xffn);
    control[KEYBYTES + CONTEXTBYTES + 7] = Number(msg_id & 0xffn);

    const ciphertext: Uint8Array = check(
      plugin.ops.secretbox_encrypt.dispatch(control, input),
      control
    );

    utils.memzero(control);

    return ciphertext;
  }
}

export namespace sign {
  export const BYTES: number = 64;
  export const CONTEXTBYTES: number = 8;
  export const PUBLICKEYBYTES: number = 32;
  export const SECRETKEYBYTES: number = 64;
  export const SEEDBYTES: number = 32;

  export class Context {
    public readonly bufferview: Uint8Array;

    constructor(raw_context: string | Uint8Array) {
      if (raw_context.length !== CONTEXTBYTES) {
        throw new errors.HydroError();
      }

      if (typeof raw_context === "string") {
        raw_context = encoder.encode(raw_context);
      }

      this.bufferview = raw_context;
    }

    public static create(raw_context: string | Uint8Array): Context {
      return new Context(raw_context);
    }
  }

  export class KeyPair {
    public readonly public_key: PublicKey;
    public readonly secret_key: SecretKey;

    constructor(raw_public_key: Uint8Array, raw_secret_key: Uint8Array) {
      this.public_key = new PublicKey(raw_public_key);

      this.secret_key = new SecretKey(raw_secret_key);
    }

    public static gen(): KeyPair {
      const keys: Uint8Array = check(
        plugin.ops.sign_keypair_gen.dispatch(ZERO_BUF)
      );

      return new KeyPair(
        keys.subarray(0, PUBLICKEYBYTES),
        keys.subarray(PUBLICKEYBYTES, PUBLICKEYBYTES + SECRETKEYBYTES)
      );
    }
  }

  export class PublicKey {
    public readonly bufferview: Uint8Array;

    constructor(raw_public_key: Uint8Array) {
      if (raw_public_key.byteLength !== PUBLICKEYBYTES) {
        throw new errors.HydroError();
      }

      this.bufferview = raw_public_key;
    }
  }

  export class SecretKey {
    public readonly bufferview: Uint8Array;

    constructor(raw_secret_key: Uint8Array) {
      if (raw_secret_key.byteLength !== SECRETKEYBYTES) {
        throw new errors.HydroError();
      }

      this.bufferview = raw_secret_key;
    }
  }

  export class Signature {
    public readonly bufferview: Uint8Array;

    constructor(raw_signature: Uint8Array) {
      if (raw_signature.byteLength !== BYTES) {
        throw new errors.HydroError();
      }

      this.bufferview = raw_signature;
    }
  }

  export interface Sign {
    update(input: Uint8Array): Sign;
    finish_create(secret_key: SecretKey): Signature;
    finish_verify(signature: Signature, public_key: PublicKey): void;
  }

  class SignImpl implements Sign {
    // 4-byte cross-lang identifier
    private readonly id: Uint8Array;

    constructor(context: Context) {
      const control: Uint8Array = new Uint8Array(CONTEXTBYTES);

      control.set(context.bufferview, 0);

      this.id = check(plugin.ops.sign_init.dispatch(control), control);

      utils.memzero(control);
    }

    public update(input: Uint8Array): Sign {
      check(plugin.ops.sign_sign_update.dispatch(this.id, input));

      return this;
    }

    public finish_create(secret_key: SecretKey): Signature {
      const control: Uint8Array = new Uint8Array(
        this.id.byteLength + SECRETKEYBYTES
      );

      control.set(this.id, 0);

      control.set(secret_key.bufferview, this.id.byteLength);

      const signature: Signature = new Signature(
        check(plugin.ops.sign_sign_finish_create.dispatch(control), control)
      );

      utils.memzero(control);

      return signature;
    }

    public finish_verify(signature: Signature, public_key: PublicKey): void {
      const control: Uint8Array = new Uint8Array(
        this.id.byteLength + BYTES + PUBLICKEYBYTES
      );

      control.set(this.id, 0);

      control.set(signature.bufferview, this.id.byteLength);

      control.set(public_key.bufferview, this.id.byteLength + BYTES);

      check(plugin.ops.sign_sign_finish_verify.dispatch(control), control);

      utils.memzero(control);
    }
  }

  export function init(context: Context): Sign {
    return new SignImpl(context);
  }

  export function create(
    input: Uint8Array,
    context: Context,
    secret_key: SecretKey
  ): Signature {
    const control: Uint8Array = new Uint8Array(SECRETKEYBYTES + CONTEXTBYTES);

    control.set(secret_key.bufferview, 0);

    control.set(context.bufferview, SECRETKEYBYTES);

    const signature: Signature = new Signature(
      check(plugin.ops.sign_create.dispatch(control, input), control)
    );

    utils.memzero(control);

    return signature;
  }

  export function verify(
    signature: Signature,
    input: Uint8Array,
    context: Context,
    public_key: PublicKey
  ): void {
    const control: Uint8Array = new Uint8Array(
      PUBLICKEYBYTES + CONTEXTBYTES + BYTES
    );

    control.set(public_key.bufferview, 0);

    control.set(context.bufferview, PUBLICKEYBYTES);

    control.set(signature.bufferview, PUBLICKEYBYTES + CONTEXTBYTES);

    check(plugin.ops.sign_verify.dispatch(control, input), control);

    utils.memzero(control);
  }
}

export namespace utils {
  export function bin2hex(buf: Uint8Array): string {
    const bin_hex: Uint8Array = check(plugin.ops.utils_bin2hex.dispatch(buf));

    const hex: string = decoder.decode(bin_hex);

    utils.memzero(bin_hex);

    return hex;
  }

  export function compare(a: Uint8Array, b: Uint8Array): number {
    const control: Uint8Array = new Uint8Array(
      2 + 2 + a.byteLength + b.byteLength
    );

    control[0] = (a.byteLength >> 8) & 0xff;
    control[1] = a.byteLength & 0xff;

    control[2] = (b.byteLength >> 8) & 0xff;
    control[3] = b.byteLength & 0xff;

    control.set(a, 2 + 2);
    control.set(b, 2 + 2 + a.byteLength);

    const ordering_byte: Uint8Array = check(
      plugin.ops.utils_compare.dispatch(control),
      control
    );

    utils.memzero(control);

    const comparison: number = ordering_byte[0] - 1;

    utils.memzero(ordering_byte);

    return comparison;
  }

  export function equal(a: Uint8Array, b: Uint8Array): boolean {
    const control: Uint8Array = new Uint8Array(
      2 + 2 + a.byteLength + b.byteLength
    );

    control[0] = (a.byteLength >> 8) & 0xff;
    control[1] = a.byteLength & 0xff;

    control[2] = (b.byteLength >> 8) & 0xff;
    control[3] = b.byteLength & 0xff;

    control.set(a, 2 + 2);
    control.set(b, 2 + 2 + a.byteLength);

    const equality_byte: Uint8Array = check(
      plugin.ops.utils_equal.dispatch(control),
      control
    );

    utils.memzero(control);

    const equality: boolean = !!equality_byte[0];

    utils.memzero(equality_byte);

    return equality;
  }

  export function hex2bin(hex: string, ignore: string = ""): Uint8Array {
    const control: Uint8Array = new Uint8Array(
      2 + 2 + hex.length + ignore.length
    );

    control[0] = (hex.length >> 8) & 0xff;
    control[1] = hex.length & 0xff;

    control[2] = (ignore.length >> 8) & 0xff;
    control[3] = ignore.length & 0xff;

    const bin_hex: Uint8Array = encoder.encode(hex);

    const bin_ignore: Uint8Array = encoder.encode(ignore);

    control.set(bin_hex, 2 + 2);
    control.set(bin_ignore, 2 + 2 + bin_hex.byteLength);

    const bin: Uint8Array = check(
      plugin.ops.utils_hex2bin.dispatch(control),
      control
    );

    utils.memzero(control);

    return bin;
  }

  export function increment(buf: Uint8Array): void {
    check(plugin.ops.utils_increment.dispatch(ZERO_BUF, buf));
  }

  export function memzero(buf: Uint8Array): void {
    buf.fill(0x00);
  }

  export function pad(buf: Uint8Array, blocksize: number): Uint8Array {
    const control: Uint8Array = new Uint8Array(4 + buf.byteLength);

    control[0] = (buf.byteLength >> 8) & 0xff;
    control[1] = buf.byteLength & 0xff;

    control[2] = (blocksize >> 8) & 0xff;
    control[3] = blocksize & 0xff;

    control.set(buf, 4);

    const padded: Uint8Array = check(
      plugin.ops.utils_pad.dispatch(control),
      control
    );

    utils.memzero(control);

    return padded;
  }

  export function unpad(buf: Uint8Array, blocksize: number): Uint8Array {
    const control: Uint8Array = new Uint8Array(4 + buf.byteLength);

    control[0] = (buf.byteLength >> 8) & 0xff;
    control[1] = buf.byteLength & 0xff;

    control[2] = (blocksize >> 8) & 0xff;
    control[3] = blocksize & 0xff;

    control.set(buf, 4);

    const unpadded: Uint8Array = check(
      plugin.ops.utils_unpad.dispatch(control),
      control
    );

    utils.memzero(control);

    return unpadded;
  }
}

export namespace version {
  export function major(): number {
    const buf: Uint8Array = check(plugin.ops.version_major.dispatch(ZERO_BUF));

    return (buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3];
  }

  export function minor(): number {
    const buf: Uint8Array = check(plugin.ops.version_minor.dispatch(ZERO_BUF));

    return (buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3];
  }

  export function string(): string {
    const buf: Uint8Array = check(
      plugin.ops.version_string.dispatch(ZERO_BUF)
    );

    return decoder.decode(buf);
  }
}
