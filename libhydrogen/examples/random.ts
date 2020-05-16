import { random } from "./../mod.ts";

const r: number = random.uniform(9);

const buf: Uint8Array = random.buf(r + 1);

console.log("r, buf", r, buf);
