import { poly1305ClampLittleEndianBigInt } from "./poly1305_clamp/poly1305_clamp.ts";
import { poly1305MsgBlockToBigInt } from "./poly1305_msg_block_to_big_int/poly1305_msg_block_to_big_int.ts";
import {
  littleEndianBytesToBigInt,
  BigIntToSixteenLittleEndianBytes
} from "./util/util.ts";

const PRIME1305: bigint = 2n ** 130n - 5n;

export const OUTPUT_BYTES: number = 16;
export const KEY_BYTES: number = 32;

export function poly1305(
  out: Uint8Array,
  key: Uint8Array,
  msg: Uint8Array
): void {
  const r: bigint = poly1305ClampLittleEndianBigInt(
    littleEndianBytesToBigInt(key.subarray(0, 16))
  );

  const s: bigint = littleEndianBytesToBigInt(key.subarray(16, 32));

  const loopEnd: number = Math.ceil(msg.byteLength / 16);

  let acc: bigint = 0n;

  for (let i: number = 1; i <= loopEnd; ++i) {
    acc = (r * (acc + poly1305MsgBlockToBigInt(msg, i * 16))) % PRIME1305;
  }

  BigIntToSixteenLittleEndianBytes(acc + s, out);
}
