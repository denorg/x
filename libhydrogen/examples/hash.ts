import { hash } from "./../mod.ts";

const encoder: TextEncoder = new TextEncoder();

const context: hash.Context = hash.Context.create("examples");
const key: hash.Key = hash.Key.gen();
const msg: Uint8Array = Uint8Array.from([65, 67, 65, 66]);

/// single-part example without a key

const digest1: Uint8Array = hash.hash(hash.BYTES, msg, context);

console.log("digest1", digest1);

/// single-part example with a key

const digest2: Uint8Array = hash.hash(hash.BYTES, msg, context, key);

console.log("digest2", digest2);

/// multi-part example with a key

const msg_part1: Uint8Array = encoder.encode("Arbitrary data to hash");
const msg_part2: Uint8Array = encoder.encode("is longer than expected");

const inst: hash.DefaultHasher = hash.init(context, key);

inst.update(msg_part1);
inst.update(msg_part2);

const digest3: Uint8Array = inst.finish(hash.BYTES);

console.log("digest3", digest3);
