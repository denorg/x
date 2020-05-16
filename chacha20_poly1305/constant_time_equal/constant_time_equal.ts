export function constantTimeEqual(
  a: Uint8Array,
  b: Uint8Array,
  length: number
): boolean {
  let diff: number = 0;

  for (let i: number = 0; i < length; ++i) {
    diff |= a[i] ^ b[i];
  }

  return diff === 0;
}
