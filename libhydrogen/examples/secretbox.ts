import { secretbox } from "./../mod.ts";

const context: secretbox.Context = secretbox.Context.create("examples");
const key: secretbox.Key = secretbox.Key.gen();
const msg: Uint8Array = Uint8Array.from([65, 67, 65, 66]);

const ciphertext: Uint8Array = secretbox.encrypt(msg, 0n, context, key);
const plaintext: Uint8Array = secretbox.decrypt(ciphertext, 0n, context, key);

console.log("plaintext", plaintext);
console.log("msg", msg);
