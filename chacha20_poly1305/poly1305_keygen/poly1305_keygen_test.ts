import { assertEquals, encode } from "./../test_deps.ts";
import { poly1305KeyGen } from "./poly1305_keygen.ts";

const {
  readFileSync,
  build: { os }
} = Deno;

const DIRNAME = (os !== "win" ? "/" : "") +
  import.meta.url.replace(/^file:\/+|\/[^/]+$/g, "");

interface TestVector {
  key: Uint8Array;
  nonce: Uint8Array;
  otk: Uint8Array;
}

function loadTestVectors(): TestVector[] {
  return JSON.parse(
    new TextDecoder().decode(
      readFileSync(`${DIRNAME}/poly1305_keygen_test_vectors.json`)
    )
  ).map(
    (testVector: { [key: string]: string; }): TestVector => ({
      key: encode(testVector.key, "hex"),
      nonce: encode(testVector.nonce, "hex"),
      otk: encode(testVector.otk, "hex")
    })
  );
}

// See https://tools.ietf.org/html/rfc8439
const testVectors: TestVector[] = loadTestVectors();

testVectors.forEach(
  ({ key, nonce, otk }: TestVector, i: number): void => {
    Deno.test({
      name: `poly1305KeyGen [${i}]`,
      fn(): void {
        assertEquals(poly1305KeyGen(key, nonce), otk);
      }
    });
  }
);
