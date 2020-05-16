import { assert, assertEquals, encode } from "./../test_deps.ts";
import {
  poly1305ClampLittleEndianBytes,
  poly1305ClampLittleEndianBigInt
} from "./poly1305_clamp.ts";
import { littleEndianBytesToBigInt } from "./../util/util.ts";

Deno.test({
  name: "poly1305ClampLittleEndianBytes",
  fn(): void {
    const r: Uint8Array = encode("deadbeefdeadbeefdeadbeefdeadbeef", "hex");

    poly1305ClampLittleEndianBytes(r);

    for (let i: number = 0; i < 16; ++i) {
      if (i === 3 || i === 7 || i === 11 || i === 15) {
        assert(r[i] < 16);
      } else if (i === 4 || i === 8 || i === 12) {
        assert(r[i] % 4 === 0);
      }
    }
  }
});

Deno.test({
  name: "poly1305ClampLittleEndianBigInt",
  fn(): void {
    let r: Uint8Array = encode("deadbeefdeadbeefdeadbeefdeadbeef", "hex");

    poly1305ClampLittleEndianBytes(r);

    const expected: bigint = littleEndianBytesToBigInt(r);

    const rb: bigint = littleEndianBytesToBigInt(
      encode("deadbeefdeadbeefdeadbeefdeadbeef", "hex")
    );

    const actual: bigint = poly1305ClampLittleEndianBigInt(rb);

    assertEquals(actual, expected);
  }
});
