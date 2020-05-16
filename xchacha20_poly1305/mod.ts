import {
  CHACHA20_NONCE_BYTES,
  chacha20poly1305Seal,
  chacha20poly1305Open,
  HCHACHA20_NONCE_BYTES,
  HCHACHA20_OUTPUT_BYTES,
  hchacha20
} from "./deps.ts";

export const KEY_BYTES: number = 32;
export const NONCE_BYTES: number = 24;
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

  const chacha20poly1305Key: Uint8Array = new Uint8Array(
    HCHACHA20_OUTPUT_BYTES
  );

  hchacha20(
    chacha20poly1305Key,
    key,
    nonce.subarray(0, HCHACHA20_NONCE_BYTES)
  );

  const chacha20poly1305Nonce: Uint8Array = new Uint8Array(
    CHACHA20_NONCE_BYTES
  );

  chacha20poly1305Nonce.set(
    nonce.subarray(HCHACHA20_NONCE_BYTES, nonce.byteLength),
    4
  );

  const sealed: null | {
    ciphertext: Uint8Array;
    tag: Uint8Array;
    aad: Uint8Array;
  } = chacha20poly1305Seal(
    chacha20poly1305Key,
    chacha20poly1305Nonce,
    plaintext,
    aad
  );

  chacha20poly1305Key.fill(0x00, 0, chacha20poly1305Key.byteLength);

  return sealed;
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

  const chacha20poly1305Key: Uint8Array = new Uint8Array(
    HCHACHA20_OUTPUT_BYTES
  );

  hchacha20(
    chacha20poly1305Key,
    key,
    nonce.subarray(0, HCHACHA20_NONCE_BYTES)
  );

  const chacha20poly1305Nonce: Uint8Array = new Uint8Array(
    CHACHA20_NONCE_BYTES
  );

  chacha20poly1305Nonce.set(
    nonce.subarray(HCHACHA20_NONCE_BYTES, nonce.byteLength),
    4
  );

  const plaintext: null | Uint8Array = chacha20poly1305Open(
    chacha20poly1305Key,
    chacha20poly1305Nonce,
    ciphertext,
    aad,
    receivedTag
  );

  chacha20poly1305Key.fill(0x00, 0, chacha20poly1305Key.byteLength);

  return plaintext;
}
