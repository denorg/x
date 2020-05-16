import { fourLittleEndianBytesToNumber } from "./../util/util.ts";

export function hchacha20InitState(
  key: Uint8Array,
  nonce: Uint8Array,
  constant?: Uint8Array
): Uint32Array {
  const state: Uint32Array = new Uint32Array(16);

  if (!constant) {
    state[0] = 0x61707865;
    state[1] = 0x3320646e;
    state[2] = 0x79622d32;
    state[3] = 0x6b206574;
  } else {
    state[0] = fourLittleEndianBytesToNumber(constant, 0);
    state[1] = fourLittleEndianBytesToNumber(constant, 4);
    state[2] = fourLittleEndianBytesToNumber(constant, 8);
    state[3] = fourLittleEndianBytesToNumber(constant, 12);
  }

  state[4] = fourLittleEndianBytesToNumber(key, 0);
  state[5] = fourLittleEndianBytesToNumber(key, 4);
  state[6] = fourLittleEndianBytesToNumber(key, 8);
  state[7] = fourLittleEndianBytesToNumber(key, 12);
  state[8] = fourLittleEndianBytesToNumber(key, 16);
  state[9] = fourLittleEndianBytesToNumber(key, 20);
  state[10] = fourLittleEndianBytesToNumber(key, 24);
  state[11] = fourLittleEndianBytesToNumber(key, 28);
  state[12] = fourLittleEndianBytesToNumber(nonce, 0);
  state[13] = fourLittleEndianBytesToNumber(nonce, 4);
  state[14] = fourLittleEndianBytesToNumber(nonce, 8);
  state[15] = fourLittleEndianBytesToNumber(nonce, 12);

  return state;
}
