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
