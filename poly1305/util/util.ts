export function littleEndianBytesToBigInt(x: Uint8Array): bigint {
  let b: bigint = 0n;

  for (let i: number = 0; i < x.byteLength; ++i) {
    b += BigInt(x[i]) << BigInt(i * 8);
  }

  return b;
}

const BIGINT_BYTE_MASK: bigint = BigInt(0xff);
const BIGINT_EIGHT: bigint = BigInt(8);

export function BigIntToSixteenLittleEndianBytes(
  b: bigint,
  out: Uint8Array
): void {
  for (let i: number = 0; i < 16; ++i) {
    out[i] = Number(b & BIGINT_BYTE_MASK);
    b >>= BIGINT_EIGHT;
  }
}
