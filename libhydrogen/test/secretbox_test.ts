import { assert, assertEquals, assertThrows } from "./deps.ts";
import { errors, random, secretbox, utils } from "./../mod.ts";

const CONTEXT: secretbox.Context = new secretbox.Context(
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
const KEY: secretbox.Key = new secretbox.Key();

Deno.test({
  name: "secretbox.CONTEXTBYTES",
  fn(): void {
    assertEquals(typeof secretbox.CONTEXTBYTES, "number");
    assertEquals(secretbox.CONTEXTBYTES, 8);
  }
});

Deno.test({
  name: "secretbox.HEADERBYTES",
  fn(): void {
    assertEquals(typeof secretbox.HEADERBYTES, "number");
    assertEquals(secretbox.HEADERBYTES, 36);
  }
});

Deno.test({
  name: "secretbox.KEYBYTES",
  fn(): void {
    assertEquals(typeof secretbox.KEYBYTES, "number");
    assertEquals(secretbox.KEYBYTES, 32);
  }
});

Deno.test({
  name: "secretbox.PROBEBYTES",
  fn(): void {
    assertEquals(typeof secretbox.PROBEBYTES, "number");
    assertEquals(secretbox.PROBEBYTES, 16);
  }
});

Deno.test({
  name: "secretbox.Context.create(raw_context) creates an 8-byte context",
  fn(): void {
    const context: secretbox.Context = secretbox.Context.create("denoland");

    assertEquals(context.bufferview.byteLength, secretbox.CONTEXTBYTES);

    assert(context.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name:
    "secretbox - new secretbox.Context(raw_context) instantiates an 8-byte context",
  fn(): void {
    const context: secretbox.Context = new secretbox.Context("denoland");

    assertEquals(context.bufferview.byteLength, secretbox.CONTEXTBYTES);

    assert(context.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "secretbox.Key.gen() generates a 32-byte key",
  fn(): void {
    const key: secretbox.Key = secretbox.Key.gen();

    assertEquals(key.bufferview.byteLength, secretbox.KEYBYTES);

    assert(key.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "secretbox - new secretbox.Key(raw_key?) instantiates a 32-byte key",
  fn(): void {
    const key: secretbox.Key = new secretbox.Key();

    assertEquals(key.bufferview.byteLength, secretbox.KEYBYTES);

    assert(key.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "secretbox.Probe.create() creates a 16-byte probe",
  fn(): void {
    const probe: secretbox.Probe = secretbox.Probe.create(INPUT, CONTEXT, KEY);

    assertEquals(probe.bufferview.byteLength, secretbox.PROBEBYTES);

    assert(probe.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name:
    "secretbox - new secretbox.Probe(input, context, key) instantiates a 16-byte probe",
  fn(): void {
    const probe: secretbox.Probe = new secretbox.Probe(INPUT, CONTEXT, KEY);

    assertEquals(probe.bufferview.byteLength, secretbox.PROBEBYTES);

    assert(probe.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name: "secretbox.Probe#verify(input, context, key) verifies",
  fn(): void {
    const probe: secretbox.Probe = new secretbox.Probe(INPUT, CONTEXT, KEY);

    probe.verify(INPUT, CONTEXT, KEY);

    assertEquals(probe.bufferview.byteLength, secretbox.PROBEBYTES);

    assert(probe.bufferview.some((byte: number): boolean => byte !== 0));
  }
});

Deno.test({
  name:
    "secretbox.Probe#verify(input, context, key) throws if args are invalid",
  fn(): void {
    const probe: secretbox.Probe = new secretbox.Probe(INPUT, CONTEXT, KEY);

    assertThrows(() => {
      probe.verify(INPUT, CONTEXT, new secretbox.Key()),
        errors.HydroError,
        "plugin op failed";
    });
  }
});

Deno.test({
  name: "secretbox.decrypt|encrypt(input, msg_id, context, key)",
  fn(): void {
    const ciphertext: Uint8Array = secretbox.encrypt(INPUT, 2n, CONTEXT, KEY);

    const plaintext: Uint8Array = secretbox.decrypt(
      ciphertext,
      2n,
      CONTEXT,
      KEY
    );

    assertEquals(plaintext, INPUT);
  }
});

Deno.test({
  name:
    "secretbox.decrypt(input, msg_id, context, key) throws if input.byteLength is lt 36",
  fn(): void {
    assertThrows(() => {
      secretbox.decrypt(INPUT.slice(0, 35), 2n, CONTEXT, KEY),
        errors.HydroError,
        "plugin op failed";
    });
  }
});

Deno.test({
  name: "secretbox - libhydrogen full cut",
  fn(): void {
    const context: secretbox.Context = new secretbox.Context("libtests");
    const key: secretbox.Key = new secretbox.Key(
      new Uint8Array(secretbox.KEYBYTES)
    );
    const seed: random.Seed = new random.Seed(
      new Uint8Array(random.SEEDBYTES)
    );
    const m: Uint8Array = new Uint8Array(25);

    let m2: Uint8Array = new Uint8Array(25);
    let c: Uint8Array = new Uint8Array(secretbox.HEADERBYTES + 25);

    random.buf_deterministic_into(m, seed);

    utils.increment(seed.bufferview);

    random.buf_deterministic_into(key.bufferview, seed);

    utils.increment(seed.bufferview);

    c = secretbox.encrypt(m, 0n, context, key);

    m2 = secretbox.decrypt(c, 0n, context, key);

    assert(utils.equal(m, m2));

    const probe: secretbox.Probe = secretbox.Probe.create(c, context, key);

    probe.verify(c, context, key);

    probe.bufferview[0]++;

    assertThrows((): void => {
      probe.verify(c, context, key);
    });

    probe.bufferview[0]--;

    key.bufferview[0]++;

    assertThrows((): void => {
      probe.verify(c, context, key);
    });

    key.bufferview[0]--;

    assertThrows((): void => {
      secretbox.decrypt(c.subarray(0, 0), 0n, context, key);
    });

    assertThrows((): void => {
      secretbox.decrypt(c.subarray(0, 1), 0n, context, key);
    });

    assertThrows((): void => {
      secretbox.decrypt(
        c.subarray(0, secretbox.HEADERBYTES),
        0n,
        context,
        key
      );
    });

    assertThrows((): void => {
      secretbox.decrypt(c, 1n, context, key);
    });

    key.bufferview[0]++;

    assertThrows((): void => {
      secretbox.decrypt(c, 0n, context, key);
    });

    key.bufferview[0]--;

    c[random.uniform(c.byteLength)]++;

    assertThrows((): void => {
      secretbox.decrypt(c, 0n, context, key);
    });
  }
});
