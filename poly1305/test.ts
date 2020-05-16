import { assertEquals, encode } from "./test_deps.ts";
import { OUTPUT_BYTES, poly1305 } from "./mod.ts";

interface TestVector {
  key: Uint8Array;
  msg: Uint8Array;
  tag: Uint8Array;
}

function loadTestVectors(): TestVector[] {
  return JSON.parse(
    new TextDecoder().decode(Deno.readFileSync(`./test_vectors.json`))
  ).map(
    (testVector: { [key: string]: string; }): TestVector => ({
      key: encode(testVector.key, "hex"),
      msg: encode(testVector.msg, "hex"),
      tag: encode(testVector.tag, "hex")
    })
  );
}

// See https://tools.ietf.org/html/rfc8439
const testVectors: TestVector[] = loadTestVectors();

testVectors.forEach(
  ({ key, msg, tag: expected }: TestVector, i: number): void => {
    Deno.test({
      name: `poly1305 [${i}]`,
      fn(): void {
        const tag: Uint8Array = new Uint8Array(OUTPUT_BYTES);

        poly1305(tag, key, msg);

        assertEquals(tag, expected);
      }
    });
  }
);
