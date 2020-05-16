import { assertEquals } from "https://deno.land/std@v0.34.0/testing/asserts.ts";
import { encode } from "https://denopkg.com/chiefbiiko/std-encoding@v1.0.0/mod.ts";
import { xchacha20 } from "./mod.ts";

interface TestVector {
  key: Uint8Array;
  nonce: Uint8Array;
  counter: number;
  plaintext: Uint8Array;
  ciphertext: Uint8Array;
}

function loadTestVectors(): TestVector[] {
  return JSON.parse(
    new TextDecoder().decode(Deno.readFileSync(`./test_vectors.json`))
  ).map(
    (testVector: { [key: string]: any }): TestVector => ({
      key: encode(testVector.key, "hex"),
      nonce: encode(testVector.nonce, "hex"),
      counter: testVector.counter,
      plaintext: encode(testVector.plaintext, "hex"),
      ciphertext: encode(testVector.ciphertext, "hex")
    })
  );
}

// See https://tools.ietf.org/html/draft-irtf-cfrg-xchacha-01#appendix-A.3.2
const testVectors: TestVector[] = loadTestVectors();

testVectors.forEach(
  (
    { key, nonce, counter, plaintext, ciphertext }: TestVector,
    i: number
  ): void => {
    Deno.test({
      name: `xchacha20 encryption [${i}]`,
      fn(): void {
        const out: Uint8Array = new Uint8Array(plaintext.byteLength);

        xchacha20(out, key, nonce, counter, plaintext);

        assertEquals(out, ciphertext);
      }
    });
  }
);

testVectors.forEach(
  (
    { key, nonce, counter, plaintext, ciphertext }: TestVector,
    i: number
  ): void => {
    Deno.test({
      name: `xchacha20 decryption [${i}]`,
      fn(): void {
        const out: Uint8Array = new Uint8Array(ciphertext.byteLength);

        xchacha20(out, key, nonce, counter, ciphertext);

        assertEquals(out, plaintext);
      }
    });
  }
);
