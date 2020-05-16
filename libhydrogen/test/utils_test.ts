import { assert, assertEquals } from "./deps.ts";
import { utils, random } from "./../mod.ts";

Deno.test({
  name: "utils.compare(a, b) returns -1 if a is less than b",
  fn(): void {
    const a: Uint8Array = new Uint8Array(2);
    const b: Uint8Array = Uint8Array.from([1, 2]);

    const ordering: number = utils.compare(a, b);

    assertEquals(ordering, -1);
  }
});

Deno.test({
  name: "utils.compare(a, b) returns 0 if a and b are equal",
  fn(): void {
    const a: Uint8Array = Uint8Array.from([36, 44]);
    const b: Uint8Array = Uint8Array.from([36, 44]);

    const ordering: number = utils.compare(a, b);

    assertEquals(ordering, 0);
  }
});

Deno.test({
  name: "utils.compare(a, b) returns 1 if a is more than b",
  fn(): void {
    const a: Uint8Array = Uint8Array.from([44, 44]);
    const b: Uint8Array = Uint8Array.from([44, 43]);

    const ordering: number = utils.compare(a, b);

    assertEquals(ordering, 1);
  }
});

Deno.test({
  name: "utils.equal(a, b) does constant time equality checks",
  fn(): void {
    const a: Uint8Array = Uint8Array.from([44, 44]);
    const b: Uint8Array = Uint8Array.from([44, 44]);
    const c: Uint8Array = Uint8Array.from([44, 43]);

    assert(utils.equal(a, b));
    assert(!utils.equal(b, c));
  }
});

Deno.test({
  name: "utils.increment(buf) increments a buffer in little-endian fashion",
  fn(): void {
    const buf: Uint8Array = new Uint8Array(2);

    for (let i: number = 0; i < 419; ++i) {
      utils.increment(buf);
    }

    const num: number = new DataView(buf.buffer).getUint16(0, true);

    assertEquals(num, 419);
  }
});

Deno.test({
  name: "utils.memzero(x) clears Uint8Arrays",
  fn(): void {
    const buf: Uint8Array = new Uint8Array(2).fill(99);

    assert(buf.every((byte: number): boolean => byte === 99));

    utils.memzero(buf);

    assert(buf.every((byte: number): boolean => byte === 0));
  }
});

Deno.test({
  name: "utils.pad(buf, blocksize) constructs and returns a padded buffer",
  fn(): void {
    const blocksize: number = 64;

    const a: Uint8Array = new Uint8Array(2);

    assertEquals(a.byteLength, 2);

    const b: Uint8Array = utils.pad(a, blocksize);

    assert(a !== b);

    assertEquals(b.byteLength, blocksize);
  }
});

Deno.test({
  name: "utils - hex encoding",
  fn(): void {
    const msg: string = "41434142";

    const buf: Uint8Array = utils.hex2bin(msg);

    const str: string = utils.bin2hex(buf);

    assertEquals(buf, Uint8Array.from([0x41, 0x43, 0x41, 0x42]));

    assertEquals(str, msg);
  }
});

Deno.test({
  name: "utils.unpad(buf, blocksize) unpads a padded buffer",
  fn(): void {
    const blocksize: number = random.uniform(500) + 1;

    const original: Uint8Array = Uint8Array.from([0x36]);

    const padded: Uint8Array = utils.pad(original, blocksize);

    const unpadded: Uint8Array = utils.unpad(padded, blocksize);

    assertEquals(unpadded, original);
  }
});

Deno.test({
  name: "utils - libhydrogen full cut",
  fn(): void {
    const x: Uint8Array = new Uint8Array(100);
    const y: Uint8Array = new Uint8Array(100);
    const a: Uint8Array = Uint8Array.from([1, 2, 3, 4, 5]);
    const b: Uint8Array = Uint8Array.from([1, 2, 3, 4, 5]);

    x.fill(0xd0);
    utils.memzero(x);

    assert(x[0] === 0);
    assert(x[x.byteLength - 1] === 0);

    utils.increment(x);

    assertEquals(x[0], 1);
    assert(x[x.byteLength - 1] === 0);

    x[0] = 0xff;

    utils.increment(x);

    assert(x[0] === 0);
    assert(x[1] === 1);
    assert(x[x.byteLength - 1] === 0);
    assert(utils.equal(a, b));
    assert(utils.equal(a, a));
    assert(utils.compare(a, b) === 0);
    assert(utils.compare(a, a) === 0);

    a[0]++;

    assert(utils.compare(a, b) === 1);
    assert(utils.compare(b, a) === -1);

    random.buf_into(x);

    const hex: string = utils.bin2hex(x);

    assert(!!hex);

    const back: Uint8Array = utils.hex2bin(hex);

    assert(back.byteLength === 100);

    y.set(back);

    assert(utils.equal(x, y));

    x.set(utils.hex2bin("452a"));
    y.set(utils.hex2bin("#452a#", "#"));

    assert(utils.equal(x, y));
  }
});
