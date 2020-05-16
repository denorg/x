import { assert, assertEquals } from "./deps.ts";
import { kdf, random, utils } from "./../mod.ts";

const CONTEXT: kdf.Context = new kdf.Context(
  Uint8Array.from([0x68, 0x61, 0x73, 0x68, 0x74, 0x65, 0x73, 0x74])
);
const KEY: kdf.Key = new kdf.Key();

Deno.test({
  name: "kdf.BYTES_MIN",
  fn(): void {
    assertEquals(typeof kdf.BYTES_MIN, "number");
    assertEquals(kdf.BYTES_MIN, 16);
  }
});

Deno.test({
  name: "kdf.BYTES_MAX",
  fn(): void {
    assertEquals(typeof kdf.BYTES_MAX, "number");
    assertEquals(kdf.BYTES_MAX, 65535);
  }
});

Deno.test({
  name: "kdf.CONTEXTBYTES",
  fn(): void {
    assertEquals(typeof kdf.CONTEXTBYTES, "number");
    assertEquals(kdf.CONTEXTBYTES, 8);
  }
});

Deno.test({
  name: "kdf.KEYBYTES",
  fn(): void {
    assertEquals(typeof kdf.KEYBYTES, "number");
    assertEquals(kdf.KEYBYTES, 32);
  }
});

Deno.test({
  name:
    "kdf.Context.create(raw_context) creates an 8-byte context for hashing",
  fn(): void {
    const context: kdf.Context = new kdf.Context("denoland");

    assertEquals(context.bufferview.byteLength, kdf.CONTEXTBYTES);

    assert(context.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name:
    "kdf - new kdf.Context(raw_context) instantiates an 8-byte context for hashing",
  fn(): void {
    const context: kdf.Context = new kdf.Context("denoland");

    assertEquals(context.bufferview.byteLength, kdf.CONTEXTBYTES);

    assert(context.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "kdf.Key.gen() generates a 32-byte master key for key derivation",
  fn(): void {
    const key: kdf.Key = kdf.Key.gen();

    assertEquals(key.bufferview.byteLength, kdf.KEYBYTES);

    assert(key.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "kdf - new kdf.Key(raw_key?) instantiates a 32-byte key for hashing",
  fn(): void {
    const key: kdf.Key = new kdf.Key();

    assertEquals(key.bufferview.byteLength, kdf.KEYBYTES);

    assert(key.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name:
    "kdf.derive_from_key(subkey_len, subkey_id, context, key) returns a subkey_len-byte subkey",
  fn(): void {
    const subkey: Uint8Array = kdf.derive_from_key(
      kdf.BYTES_MAX,
      419n,
      CONTEXT,
      KEY
    );

    assertEquals(subkey.byteLength, kdf.BYTES_MAX);

    assert(subkey.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "kdf - libhydrogen full cut",
  fn(): void {
    // uint8_t key[hydro_kdf_KEYBYTES];
    const context: kdf.Context = new kdf.Context("libtests");
    const key: kdf.Key = kdf.Key.gen();
    // uint8_t dk[hydro_random_SEEDBYTES];
    const seed: random.Seed = new random.Seed(
      new Uint8Array(random.SEEDBYTES)
    );
    // uint8_t subkey1[16];
    // const subkey1: Uint8Array =new Uint8Array(16)
    // uint8_t subkey2[16];
    // const subkey2: Uint8Array = new Uint8Array(16)
    // uint8_t subkey3[32];
    // const subkey3: Uint8Array = new Uint8Array(32)

    // uint8_t subkey4[50];
    // const subkey4: Uint8Array = new Uint8Array(50)
    // char    subkey1_hex[16 * 2 + 1];
    //
    // char    subkey2_hex[16 * 2 + 1];
    // char    subkey3_hex[32 * 2 + 1];
    // char    subkey4_hex[50 * 2 + 1];

    // memset(dk, 0, sizeof dk);
    // utils.memzero(seed)
    // hydro_random_buf_deterministic(key, sizeof key, dk);
    random.buf_deterministic_into(key.bufferview, seed);
    // hydro_kdf_derive_from_key(subkey1, sizeof subkey1, 1, ctx, key);
    // subkey1.set(kdf.derive_from_key())
    const subkey1: Uint8Array = kdf.derive_from_key(16, 1n, context, key);
    // hydro_kdf_derive_from_key(subkey2, sizeof subkey2, 2, ctx, key);
    const subkey2: Uint8Array = kdf.derive_from_key(16, 2n, context, key);
    // hydro_kdf_derive_from_key(subkey3, sizeof subkey3, 0, ctx, key);
    const subkey3: Uint8Array = kdf.derive_from_key(32, 0n, context, key);
    // hydro_kdf_derive_from_key(subkey4, sizeof subkey4, 0, ctx, key);
    const subkey4: Uint8Array = kdf.derive_from_key(50, 0n, context, key);
    // hydro_bin2hex(subkey1_hex, sizeof subkey1_hex, subkey1, sizeof subkey1);
    // hydro_bin2hex(subkey2_hex, sizeof subkey2_hex, subkey2, sizeof subkey2);
    // hydro_bin2hex(subkey3_hex, sizeof subkey3_hex, subkey3, sizeof subkey3);
    // hydro_bin2hex(subkey4_hex, sizeof subkey4_hex, subkey4, sizeof subkey4);
    assertEquals(utils.bin2hex(subkey1), "af8019d3516d4ba6c80a7ea5a87e4d77");
    // assert_streq("af8019d3516d4ba6c80a7ea5a87e4d77", subkey1_hex);
    // assert_streq("af8c4cba4e1f36c293631cc7001717dd", subkey2_hex);
    assertEquals(utils.bin2hex(subkey2), "af8c4cba4e1f36c293631cc7001717dd");
    assertEquals(
      utils.bin2hex(subkey3),
      "ff9345489dea1e4fe59194cea8794c9b0af9380c2d18c3ab38eeef2af95c1e26"
    );
    // assert_streq("ff9345489dea1e4fe59194cea8794c9b0af9380c2d18c3ab38eeef2af95c1e26", subkey3_hex);
    assertEquals(
      utils.bin2hex(subkey4),
      "a8dd79ca19d604d1487b82d76b8d4ad4138a29dfaeeb207b99b2e5904e7855555bb94a76070fa71871df6ed911661d99efec"
    );
    // assert_streq(
    //     "a8dd79ca19d604d1487b82d76b8d4ad4138a29dfaeeb207b99b2e5904e7855555bb94a76070fa71871df6ed911"
    //     "661d99efec",
    //     subkey4_hex);
  }
});
