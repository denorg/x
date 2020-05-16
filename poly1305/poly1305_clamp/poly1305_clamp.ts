export function poly1305ClampLittleEndianBytes(r: Uint8Array): void {
  if (r.byteLength !== 16) {
    return undefined;
  }

  r[3] &= 15;
  r[7] &= 15;
  r[11] &= 15;
  r[15] &= 15;
  r[4] &= 252;
  r[8] &= 252;
  r[12] &= 252;
}

export function poly1305ClampLittleEndianBigInt(r: bigint): bigint {
  return r & 0x0ffffffc0ffffffc0ffffffc0fffffffn;
}
