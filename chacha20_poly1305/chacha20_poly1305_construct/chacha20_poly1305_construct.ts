import { rightZeroPad16 } from "./../right_zero_pad16/right_zero_pad16.ts";
import { numberToLittleEndianBytes } from "./../util/util.ts";

export function chacha20poly1305Construct(
  ciphertext: Uint8Array,
  aad: Uint8Array
): Uint8Array {
  const paddedCiphertext: Uint8Array = rightZeroPad16(ciphertext);
  const paddedAad: Uint8Array = rightZeroPad16(aad);
  const paddedTotalLength: number = paddedCiphertext.byteLength +
    paddedAad.byteLength;
  const pac: Uint8Array = new Uint8Array(paddedTotalLength + 16);

  pac.set(paddedAad, 0);
  pac.set(paddedCiphertext, paddedAad.byteLength);

  numberToLittleEndianBytes(aad.byteLength, pac, 8, paddedTotalLength);
  numberToLittleEndianBytes(
    ciphertext.byteLength,
    pac,
    8,
    paddedTotalLength + 8
  );

  return pac;
}
