import { assertEquals } from "https://deno.land/std@v0.34.0/testing/asserts.ts";
import { sha512 } from "./mod.ts";
import { encode } from "./deps.ts";

interface TestVector {
  msg: Uint8Array;
  msg_bit_len: number;
  hash: Uint8Array;
}

const testVectors: TestVector[] = (JSON.parse(
  new TextDecoder().decode(Deno.readFileSync("./test_vectors.json"))
) as any[]).map(
  ({ msg, msg_bit_len, hash }): TestVector => ({
    msg: msg ? encode(msg, "hex") : new Uint8Array(0),
    msg_bit_len,
    hash: encode(hash, "hex")
  })
);

testVectors.forEach(({ msg, msg_bit_len, hash }: TestVector) => {
  Deno.test({
    name: `SHA2-512 ${msg_bit_len ? msg_bit_len / 8 : 0}-byte msg`,
    fn(): void {
      assertEquals(sha512(msg), hash);
    }
  });
});
