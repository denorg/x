import {
  chacha20,
  CHACHA20_NONCE_BYTES,
  hchacha20,
  HCHACHA20_NONCE_BYTES,
  HCHACHA20_OUTPUT_BYTES
} from "./deps.ts";

export const KEY_BYTES: number = 32;
export const NONCE_BYTES: number = 24;

export function xchacha20(
  out: Uint8Array,
  key: Uint8Array,
  nonce: Uint8Array,
  counter: number,
  text: Uint8Array
): void {
  const chacha20Key: Uint8Array = new Uint8Array(HCHACHA20_OUTPUT_BYTES);

  hchacha20(chacha20Key, key, nonce.subarray(0, HCHACHA20_NONCE_BYTES));

  const chacha20Nonce: Uint8Array = new Uint8Array(CHACHA20_NONCE_BYTES);

  chacha20Nonce.set(nonce.subarray(HCHACHA20_NONCE_BYTES, NONCE_BYTES), 4);

  chacha20(out, chacha20Key, chacha20Nonce, counter, text);

  chacha20Key.fill(0x00, 0, chacha20Key.byteLength);
}
