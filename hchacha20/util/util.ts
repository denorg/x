export function fourLittleEndianBytesToNumber(
  x: Uint8Array,
  o: number
): number {
  return x[o] | (x[o + 1] << 8) | (x[o + 2] << 16) | (x[o + 3] << 24);
}

export function numberToLittleEndianBytes(
  v: number,
  out: Uint8Array,
  l: number,
  o: number
): void {
  const end: number = o + l;

  for (let i: number = o; i < end; ++i) {
    out[i] = v & 0xff;
    v >>= 8;
  }
}
