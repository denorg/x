import { assert } from "./../test_deps.ts";
import { constantTimeEqual } from "./constant_time_equal.ts";

Deno.test({
  name: "constantTimeEqual true positive",
  fn(): void {
    const a: Uint8Array = new Uint8Array([1, 2, 3]);
    const b: Uint8Array = new Uint8Array([1, 2, 3]);

    assert(constantTimeEqual(a, b, 3));
  }
});

Deno.test({
  name: "constantTimeEqual true negative",
  fn(): void {
    const a: Uint8Array = new Uint8Array([1, 2, 3]);
    const b: Uint8Array = new Uint8Array([3, 2, 1]);

    assert(!constantTimeEqual(a, b, 3));
  }
});

Deno.test({
  name: "constantTimeEqual behaves undefined if length != buf.len",
  fn(): void {
    const a: Uint8Array = new Uint8Array([1, 2, 0]);
    const b: Uint8Array = new Uint8Array([1, 2]);
    const c: Uint8Array = new Uint8Array([1, 2, 5]);

    assert(constantTimeEqual(a, b, 3));
    assert(!constantTimeEqual(b, c, 3));
  }
});
