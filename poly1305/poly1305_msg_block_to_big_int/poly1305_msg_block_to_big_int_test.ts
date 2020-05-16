import { assertEquals, encode } from "./../test_deps.ts";
import { poly1305MsgBlockToBigInt } from "./poly1305_msg_block_to_big_int.ts";

const {
  readFileSync,
  build: { os }
} = Deno;

const DIRNAME = (os !== "win" ? "/" : "") +
  import.meta.url.replace(/^file:\/+|\/[^/]+$/g, "");

interface TestVector {
  msg: Uint8Array;
  expected: bigint[];
}

function loadTestVectors(): TestVector[] {
  return JSON.parse(
    new TextDecoder().decode(
      readFileSync(
        `${DIRNAME}/poly1305_msg_block_to_big_int_test_vectors.json`
      )
    )
  ).map(
    (testVector: { msg: string; expected: string[]; }): TestVector => ({
      msg: encode(testVector.msg, "hex"),
      expected: testVector.expected.map(BigInt)
    })
  );
}

// See https://tools.ietf.org/html/rfc8439
const testVectors: TestVector[] = loadTestVectors();

testVectors.forEach(
  ({ msg, expected }: TestVector, i: number): void => {
    Deno.test({
      name: `poly1305MsgBlockToBigInt [${i}]`,
      fn(): void {
        const loopEnd: number = Math.ceil(msg.byteLength / 16);

        for (let i: number = 1; i <= loopEnd; ++i) {
          assertEquals(
            poly1305MsgBlockToBigInt(msg, i * 16),
            expected.shift()
          );
        }
      }
    });
  }
);
