import { chacha20, poly1305 } from "./deps.ts";
import { poly1305KeyGen } from "./poly1305_keygen/poly1305_keygen.ts";
import { constantTimeEqual } from "./constant_time_equal/constant_time_equal.ts";
import { chacha20poly1305Construct } from "./chacha20_poly1305_construct/chacha20_poly1305_construct.ts";

export const KEY_BYTES: number = 32;
export const NONCE_BYTES: number = 12;
export const PLAINTEXT_BYTES_MAX: bigint = 274877906880n;
export const CIPHERTEXT_BYTES_MAX: bigint = 274877906896n;
export const AAD_BYTES_MAX: bigint = 18446744073709551615n;
export const TAG_BYTES: number = 16;

export function seal(
  key: Uint8Array,
  nonce: Uint8Array,
  plaintext: Uint8Array,
  aad: Uint8Array
): null | { ciphertext: Uint8Array; tag: Uint8Array; aad: Uint8Array; } {
  if (key.byteLength !== KEY_BYTES) {
    return null;
  }

  if (nonce.byteLength !== NONCE_BYTES) {
    return null;
  }

  if (plaintext.byteLength > PLAINTEXT_BYTES_MAX) {
    return null;
  }

  if (aad.byteLength > AAD_BYTES_MAX) {
    return null;
  }

  const ciphertext: Uint8Array = new Uint8Array(plaintext.byteLength);

  const tag: Uint8Array = new Uint8Array(TAG_BYTES);

  const otk: Uint8Array = poly1305KeyGen(key, nonce);

  chacha20(ciphertext, key, nonce, 1, plaintext);

  const pac: Uint8Array = chacha20poly1305Construct(ciphertext, aad);

  poly1305(tag, otk, pac);

  otk.fill(0x00, 0, otk.byteLength);

  return { ciphertext, tag, aad };
}

export function open(
  key: Uint8Array,
  nonce: Uint8Array,
  ciphertext: Uint8Array,
  aad: Uint8Array,
  receivedTag: Uint8Array
): null | Uint8Array {
  if (key.byteLength !== KEY_BYTES) {
    return null;
  }

  if (nonce.byteLength !== NONCE_BYTES) {
    return null;
  }

  if (ciphertext.byteLength > CIPHERTEXT_BYTES_MAX) {
    return null;
  }

  if (aad.byteLength > AAD_BYTES_MAX) {
    return null;
  }

  if (receivedTag.byteLength !== TAG_BYTES) {
    return null;
  }

  const tag: Uint8Array = new Uint8Array(TAG_BYTES);

  const otk: Uint8Array = poly1305KeyGen(key, nonce);
  const pac: Uint8Array = chacha20poly1305Construct(ciphertext, aad);

  poly1305(tag, otk, pac);

  otk.fill(0x00, 0, otk.byteLength);

  if (!constantTimeEqual(receivedTag, tag, TAG_BYTES)) {
    return null;
  }

  const plaintext: Uint8Array = new Uint8Array(ciphertext.byteLength);

  chacha20(plaintext, key, nonce, 1, ciphertext);

  return plaintext;
}
