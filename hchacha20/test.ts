import { assertEquals, encode } from "./test_deps.ts";
import { hchacha20, OUTPUT_BYTES } from "./mod.ts";

interface TestVector {
  key: Uint8Array;
  nonce: Uint8Array;
  constant: Uint8Array;
  expected: Uint8Array;
}

function loadTestVectors(): TestVector[] {
  return JSON.parse(
    new TextDecoder().decode(Deno.readFileSync(`./test_vectors.json`))
  ).map(
    (testVector: { [key: string]: any; }): TestVector => ({
      key: encode(testVector.key, "hex"),
      nonce: encode(testVector.nonce, "hex"),
      constant: testVector.constant && encode(testVector.constant, "hex"),
      expected: encode(testVector.expected, "hex")
    })
  );
}

// See https://tools.ietf.org/html/draft-irtf-cfrg-xchacha-01#section-2.2.1
// and https://github.com/jedisct1/libsodium/blob/master/test/default/xchacha20.c
const testVectors: TestVector[] = loadTestVectors();

testVectors.forEach(
  ({ key, nonce, constant, expected }: TestVector, i: number): void => {
    Deno.test({
      name: `hchacha20 [${i}]`,
      fn(): void {
        const actual: Uint8Array = new Uint8Array(OUTPUT_BYTES);

        hchacha20(actual, key, nonce, constant);

        assertEquals(actual, expected);
      }
    });
  }
);
