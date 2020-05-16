import {
  assert,
  assertEquals,
  assertNotEquals,
  assertThrows,
  encode
} from "./deps.ts";
import { errors, random, sign } from "./../mod.ts";

const CONTEXT: sign.Context = new sign.Context(
  Uint8Array.from([0x68, 0x61, 0x73, 0x68, 0x74, 0x65, 0x73, 0x74])
);
const INPUT: Uint8Array = new Uint8Array(
  [
    0x64,
    0x65,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x6e,
    0x6f
  ]
);

Deno.test({
  name: "sign.CONTEXTBYTES",
  fn(): void {
    assertEquals(typeof sign.CONTEXTBYTES, "number");
    assertEquals(sign.CONTEXTBYTES, 8);
  }
});

Deno.test({
  name: "sign.Context.create(raw_context) creates an 8-byte context",
  fn(): void {
    const context: sign.Context = sign.Context.create("denoland");

    assertEquals(context.bufferview.byteLength, sign.CONTEXTBYTES);

    assert(context.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "sign - new sign.Context(raw_context) instantiates an 8-byte context",
  fn(): void {
    const context: sign.Context = new sign.Context("denoland");

    assertEquals(context.bufferview.byteLength, sign.CONTEXTBYTES);

    assert(context.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "sign.KeyPair.gen() creates a keypair",
  fn(): void {
    const keypair: sign.KeyPair = sign.KeyPair.gen();

    assert(keypair instanceof sign.KeyPair);
  }
});

Deno.test({
  name:
    "sign - new sign.KeyPair(raw_public_key, raw_secret_key) instantiates a KeyPair",
  fn(): void {
    const created: sign.KeyPair = sign.KeyPair.gen();

    const keypair: sign.KeyPair = new sign.KeyPair(
      created.public_key.bufferview,
      created.secret_key.bufferview
    );

    assert(keypair instanceof sign.KeyPair);
  }
});

Deno.test({
  name:
    "sign - new sign.PublicKey(raw_public_key) instantiates a PublicKey from raw bytes",
  fn(): void {
    const raw_public_key: Uint8Array = new Uint8Array(sign.PUBLICKEYBYTES);

    const public_key: sign.PublicKey = new sign.PublicKey(raw_public_key);

    assertEquals(public_key.bufferview.byteLength, sign.PUBLICKEYBYTES);
  }
});

Deno.test({
  name:
    "sign - new sign.SecretKey(raw_secret_key) instantiates a SecretKey from raw bytes",
  fn(): void {
    const raw_secret_key: Uint8Array = new Uint8Array(sign.SECRETKEYBYTES);

    const secret_key: sign.SecretKey = new sign.SecretKey(raw_secret_key);

    assertEquals(secret_key.bufferview.byteLength, sign.SECRETKEYBYTES);
  }
});

Deno.test({
  name:
    "sign - new sign.Signature(raw_signature) instantiates a Signature from raw bytes",
  fn(): void {
    const raw_signature: Uint8Array = new Uint8Array(sign.BYTES);

    const signature: sign.Signature = new sign.Signature(raw_signature);

    assertEquals(signature.bufferview.byteLength, sign.BYTES);
  }
});

Deno.test({
  name: "sign.init() initializes a sign instance for incremental updates",
  fn(): void {
    const keypair: sign.KeyPair = sign.KeyPair.gen();

    const inst: sign.Sign = sign.init(CONTEXT);

    inst.update(INPUT);

    const signature: sign.Signature = inst.finish_create(keypair.secret_key);

    assertEquals(signature.bufferview.byteLength, sign.BYTES);

    assert(signature.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "sign.Sign#finish_verify verifies",
  fn(): void {
    const a_keypair: sign.KeyPair = sign.KeyPair.gen();

    const a: sign.Sign = sign.init(CONTEXT);

    a.update(INPUT);

    const a_signature: sign.Signature = a.finish_create(a_keypair.secret_key);

    const b: sign.Sign = sign.init(CONTEXT);

    b.update(INPUT);

    b.finish_verify(a_signature, a_keypair.public_key);
  }
});

Deno.test({
  name: "sign - same context, input, secret_key - different signature",
  fn(): void {
    const keypair: sign.KeyPair = sign.KeyPair.gen();

    const inst: sign.Sign = sign.init(CONTEXT);

    inst.update(INPUT);

    const a: sign.Signature = inst.finish_create(keypair.secret_key);

    assertEquals(a.bufferview.byteLength, sign.BYTES);

    const b: sign.Signature = sign.create(INPUT, CONTEXT, keypair.secret_key);

    assertEquals(b.bufferview.byteLength, sign.BYTES);

    const c: sign.Signature = sign.create(INPUT, CONTEXT, keypair.secret_key);

    assertEquals(c.bufferview.byteLength, sign.BYTES);

    assertNotEquals(a.bufferview, b.bufferview);

    assertNotEquals(b.bufferview, c.bufferview);
  }
});

Deno.test({
  name: "sign.verify(signature, input, context, public_key) verifies",
  fn(): void {
    const keypair: sign.KeyPair = sign.KeyPair.gen();

    const signature: sign.Signature = sign.create(
      INPUT,
      CONTEXT,
      keypair.secret_key
    );

    sign.verify(signature, INPUT, CONTEXT, keypair.public_key);
  }
});

Deno.test({
  name:
    "sign.verify(signature, input, context, public_key) throws on bogus signature",
  fn(): void {
    const keypair: sign.KeyPair = sign.KeyPair.gen();

    const signature: sign.Signature = new sign.Signature(
      new Uint8Array(sign.BYTES)
    );

    assertThrows(
      () => sign.verify(signature, INPUT, CONTEXT, keypair.public_key),
      errors.HydroError
    );
  }
});

Deno.test({
  name:
    "sign.verify(signature, input, context, public_key) throws on bogus public_key",
  fn(): void {
    const keypair: sign.KeyPair = sign.KeyPair.gen();

    const signature: sign.Signature = sign.create(
      INPUT,
      CONTEXT,
      keypair.secret_key
    );

    const public_key: sign.PublicKey = new sign.PublicKey(
      new Uint8Array(sign.PUBLICKEYBYTES)
    );

    assertThrows(
      () => sign.verify(signature, INPUT, CONTEXT, public_key),
      errors.HydroError
    );
  }
});

Deno.test({
  name: "sign - libhydrogen half cut",
  fn(): void {
    const context: sign.Context = new sign.Context("libtests");
    const msg: Uint8Array = random.buf(500);
    const keypair: sign.KeyPair = sign.KeyPair.gen();
    const sig: sign.Signature = sign.create(msg, context, keypair.secret_key);

    sign.verify(sig, msg, context, keypair.public_key);

    sig.bufferview[0]++;

    assertThrows((): void => {
      sign.verify(sig, msg, context, keypair.public_key);
    });

    sig.bufferview[0]--;
    sig.bufferview[sign.BYTES - 1]++;

    assertThrows((): void => {
      sign.verify(sig, msg, context, keypair.public_key);
    });

    sig.bufferview[sign.BYTES - 1]--;
    msg[0]++;

    assertThrows((): void => {
      sign.verify(sig, msg, context, keypair.public_key);
    });
  }
});

Deno.test({
  name: "sign - libhydrogen mini cut",
  fn(): void {
    const context: sign.Context = new sign.Context(encode("tests\0\0\0")); // "tests".into();
    let keypair: sign.KeyPair = sign.KeyPair.gen();

    let signature: sign.Signature = sign.init(context)
      .update(encode("test message"))
      .finish_create(keypair.secret_key);

    sign.init(context)
      .update(encode("test message"))
      .finish_verify(signature, keypair.public_key);

    signature = sign.create(
      encode("test message"),
      context,
      keypair.secret_key
    );

    sign.verify(
      signature,
      encode("test message"),
      context,
      keypair.public_key
    );
  }
});
