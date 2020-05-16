import { test, runIfMain } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { pbkdf2 } from "./mod.ts";

interface TestVector {
  password: Uint8Array;
  salt: Uint8Array;
  count: number;
  derivedKeyByteLength: number;
  derivedKey: Uint8Array;
}

/** Deserializes a Uint8Array from a hexadecimal string. */
function hex2buf(hex: string): Uint8Array {
  const len: number = hex.length;
  if (len % 2 || !/^[0-9a-fA-F]*$/.test(hex)) {
    throw new TypeError("Invalid hex string.");
  }
  hex = hex.toLowerCase();
  const buf: Uint8Array = new Uint8Array(Math.floor(len / 2));
  const end: number = len / 2;
  for (let i: number = 0; i < end; ++i) {
    buf[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return buf;
}

const testVectors: TestVector[] = JSON.parse(
  new TextDecoder().decode(Deno.readFileSync("./test_vectors.json"))
).map(
  ({
    password,
    salt,
    count,
    derivedKeyByteLength,
    derivedKey
  }: {
    [key: string]: any;
  }): TestVector => ({
    password: hex2buf(password),
    salt: hex2buf(salt),
    count,
    derivedKeyByteLength,
    derivedKey: hex2buf(derivedKey)
  })
);

testVectors.forEach(
  (
    { password, salt, count, derivedKey, derivedKeyByteLength }: TestVector,
    i: number
  ): void => {
    test({
      name: `PBKDF2 using HMAC-SHA1 ${i}`,
      fn(): void {
        assertEquals(
          pbkdf2(
            "sha1",
            password,
            salt,
            null,
            null,
            derivedKeyByteLength,
            count
          ),
          derivedKey
        );
      }
    });
  }
);

runIfMain(import.meta, { parallel: true });
