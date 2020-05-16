import { utils } from "./../mod.ts";

const original: Uint8Array = utils.hex2bin("abab");
const copy: Uint8Array = Uint8Array.from(original);

utils.increment(copy);

const hex: string = utils.bin2hex(copy); // acab

const order: number = utils.compare(copy, original); // 1

utils.equal(copy, original); // -> false

// note: creates a copy - different from og libhydrogen api
const padded: Uint8Array = utils.pad(original, 8);

utils.equal(padded, original); // -> false

const unpadded: Uint8Array = utils.unpad(padded, 8);

utils.equal(unpadded, original); // -> true

console.log("0xabab incremented", `0x${hex}`);
