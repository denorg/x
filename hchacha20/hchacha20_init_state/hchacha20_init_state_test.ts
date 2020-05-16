import { assertEquals, encode } from "./../test_deps.ts";
import { hchacha20InitState } from "./hchacha20_init_state.ts";

const {
  readFileSync,
  build: { os }
} = Deno;

const DIRNAME = (os !== "win" ? "/" : "") +
  import.meta.url.replace(/^file:\/+|\/[^/]+$/g, "");

interface TestVector {
  key: Uint8Array;
  nonce: Uint8Array;
  expected: Uint32Array;
}

function loadTestVectors(): TestVector[] {
  return JSON.parse(
    new TextDecoder().decode(
      readFileSync(`${DIRNAME}/hchacha20_init_state_test_vectors.json`)
    )
  ).map(
    (testVector: { [key: string]: any; }): TestVector => ({
      key: encode(testVector.key, "hex"),
      nonce: encode(testVector.nonce, "hex"),
      expected: Uint32Array.from(testVector.expected)
    })
  );
}

// See https://tools.ietf.org/html/draft-irtf-cfrg-xchacha-01#section-2.2.1
const testVectors: TestVector[] = loadTestVectors();

testVectors.forEach(
  ({ key, nonce, expected }: TestVector, i: number): void => {
    Deno.test({
      name: `hchacha20InitState [${i}]`,
      fn(): void {
        assertEquals(hchacha20InitState(key, nonce), expected);
      }
    });
  }
);
