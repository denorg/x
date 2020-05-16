export function poly1305MsgBlockToBigInt(
  msg: Uint8Array,
  blockEnd: number
): bigint {
  let loopEnd: number = 17;
  let j: number = blockEnd - 1;
  const exc: number = blockEnd - msg.byteLength;

  if (exc > 0) {
    loopEnd -= exc;
    j = blockEnd - exc - 1;
  }

  let b: bigint = 1n;

  for (let i: number = 1; i < loopEnd; ++i, --j) {
    b = BigInt(msg[j]) + b * 256n;
  }

  return b;
}
