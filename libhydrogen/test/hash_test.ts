import { assert, assertEquals, decode } from "./deps.ts";
import { hash, random, utils } from "./../mod.ts";

const CONTEXT: hash.Context = new hash.Context(
  Uint8Array.from([0x68, 0x61, 0x73, 0x68, 0x74, 0x65, 0x73, 0x74])
);
const INPUT: Uint8Array = new Uint8Array([0x64, 0x65, 0x6e, 0x6f]);
const KEY: hash.Key = new hash.Key();

Deno.test({
  name: "hash.BYTES",
  fn(): void {
    assertEquals(typeof hash.BYTES, "number");
    assertEquals(hash.BYTES, 32);
  }
});

Deno.test({
  name: "hash.BYTES_MIN",
  fn(): void {
    assertEquals(typeof hash.BYTES_MIN, "number");
    assertEquals(hash.BYTES_MIN, 16);
  }
});

Deno.test({
  name: "hash.BYTES_MAX",
  fn(): void {
    assertEquals(typeof hash.BYTES_MAX, "number");
    assertEquals(hash.BYTES_MAX, 65535);
  }
});

Deno.test({
  name: "hash.CONTEXTBYTES",
  fn(): void {
    assertEquals(typeof hash.CONTEXTBYTES, "number");
    assertEquals(hash.CONTEXTBYTES, 8);
  }
});

Deno.test({
  name: "hash.KEYBYTES",
  fn(): void {
    assertEquals(typeof hash.KEYBYTES, "number");
    assertEquals(hash.KEYBYTES, 32);
  }
});

Deno.test({
  name:
    "hash.Context.create(raw_context) creates an 8-byte context for hashing",
  fn(): void {
    const context: hash.Context = hash.Context.create("denoland");

    assertEquals(context.bufferview.byteLength, hash.CONTEXTBYTES);

    assert(context.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name:
    "hash - new hash.Context(raw_context) instantiates an 8-byte context for hashing",
  fn(): void {
    const context: hash.Context = new hash.Context("denoland");

    assertEquals(context.bufferview.byteLength, hash.CONTEXTBYTES);

    assert(context.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "hash.Key.gen() generates a 32-byte key for hashing",
  fn(): void {
    const key: hash.Key = hash.Key.gen();

    assertEquals(key.bufferview.byteLength, hash.KEYBYTES);

    assert(key.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "hash - new hash.Key(raw_key?) instantiates a 32-byte key for hashing",
  fn(): void {
    const key: hash.Key = new hash.Key();

    assertEquals(key.bufferview.byteLength, hash.KEYBYTES);

    assert(key.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "hash.init() initializes a hash instance for incremental hash updates",
  fn(): void {
    const inst: hash.DefaultHasher = hash.init(CONTEXT);

    inst.update(INPUT);

    const buf: Uint8Array = inst.finish(hash.BYTES);

    assertEquals(buf.byteLength, hash.BYTES);

    assert(buf.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "hash - DefaultHasher instances allow detached finishing",
  fn(): void {
    const out: Uint8Array = new Uint8Array(hash.BYTES);

    const inst: hash.DefaultHasher = hash.init(CONTEXT);

    inst.update(INPUT);

    inst.finish_into(out);

    assertEquals(out.byteLength, hash.BYTES);

    assert(out.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "hash - DefaultHasher's two finish methods return identical bytes",
  fn(): void {
    const buf: Uint8Array = hash.init(CONTEXT)
      .update(INPUT)
      .finish(hash.BYTES);

    const out: Uint8Array = new Uint8Array(hash.BYTES);

    hash.init(CONTEXT)
      .update(INPUT)
      .finish_into(out);

    assertEquals(buf, out);
  }
});

Deno.test({
  name: "hash.hash(out_len, input, context, key?) returns a out_len-byte hash",
  fn(): void {
    const buf: Uint8Array = hash.hash(hash.BYTES, INPUT, CONTEXT);

    assert(buf.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "hash.hash_into(out, input, context, key?) fills out with a hash",
  fn(): void {
    const out: Uint8Array = new Uint8Array(hash.BYTES);

    hash.hash_into(out, INPUT, CONTEXT);

    assert(out.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "hash.hash*(out, input, context, key?) yield identical bytes",
  fn(): void {
    const out: Uint8Array = new Uint8Array(hash.BYTES);

    hash.hash_into(out, INPUT, CONTEXT);

    const buf: Uint8Array = hash.hash(hash.BYTES, INPUT, CONTEXT);

    assertEquals(buf, out);
  }
});

Deno.test({
  name:
    "hash.hash*(out, input, context, key?) with a key yield identical bytes",
  fn(): void {
    const out: Uint8Array = new Uint8Array(hash.BYTES);

    hash.hash_into(out, INPUT, CONTEXT, KEY);

    const buf: Uint8Array = hash.hash(hash.BYTES, INPUT, CONTEXT, KEY);

    assertEquals(buf, out);
  }
});

Deno.test({
  name: "hash - libhydrogen full cut",
  fn(): void {
    const seed: random.Seed = new random.Seed(
      new Uint8Array(random.SEEDBYTES)
    );
    const context: hash.Context = new hash.Context("libtests");
    const raw_key: Uint8Array = random.buf_deterministic(hash.KEYBYTES, seed);

    utils.increment(seed.bufferview);

    const key: hash.Key = new hash.Key(raw_key);

    const msg: Uint8Array = new Uint8Array(1000);

    const inst: hash.DefaultHasher = hash.init(context, key);

    for (let i: number = 0; i <= msg.byteLength; ++i) {
      random.buf_deterministic_into(msg.subarray(0, i), seed);

      utils.increment(seed.bufferview);

      inst.update(msg.subarray(0, i));
    }

    const digest: Uint8Array = inst.finish(100);

    assertEquals(
      decode(digest, "hex"),
      "e5d2beb77a039965850ee76327e06b2fa6cb5121db8038b11bce4641a9c4bd843658104bdf07342570bb5fd1d7" +
        "2c0d31a8981b47c718fddaffbd4171605c873cbaf921bb57988dd814f3a3fbef9799ff7c762705c4bf37ab2981" +
        "5981bf0d8833d60afe14"
    );

    hash.hash_into(digest, msg, context, key);

    assertEquals(
      decode(digest, "hex"),
      "724bd8883df73320ffd70923cb997f9a99bc670c4d78887be4975add0099fbf489b266a85d1f56743062d60a05" +
        "590cbce47e45108367879bf4641cbaefe584e8618cbeb8c230ae956da22c7c5c4f11a8804ca576ec20fa5da239" +
        "dde3d03a6018383c21f5"
    );

    hash.hash_into(digest.subarray(0, hash.BYTES), msg, context, key);

    assertEquals(
      "7dfa45ce18210e2422fd658bf7beccb6e534e44f99ae359f4af3ba41af8ca463",
      decode(digest.subarray(0, hash.BYTES), "hex")
    );
  }
});
