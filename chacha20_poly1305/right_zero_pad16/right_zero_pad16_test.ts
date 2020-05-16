import { assert, assertEquals } from "./../test_deps.ts";
import { rightZeroPad16 } from "./right_zero_pad16.ts";

Deno.test({
  name: "rightZeroPad16",
  fn(): void {
    const x: Uint8Array = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const y: Uint8Array = rightZeroPad16(x);

    assert(y.byteLength % 16 === 0);
    assertEquals(y.subarray(0, x.byteLength), x);
    assert(
      y.subarray(x.byteLength, y.byteLength).every((b: number) => b === 0x00)
    );
  }
});
