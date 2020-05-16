import {
  BYTES,
  siphash24
} from "https://denopkg.com/chiefbiiko/siphash24/mod.ts";

import {
  encode,
  decode
} from "https://denopkg.com/chiefbiiko/std-encoding/mod.ts";

const msg: Uint8Array = encode("msg from a MIB"); // x-byte msg
const key: Uint8Array = encode("sixteen_byte_key"); // 16-byte key
const mac: Uint8Array = new Uint8Array(BYTES); // 8-byte mac

siphash24(msg, key, mac);

console.log(
  "msg: ",
  decode(msg),
  "\nkey: ",
  decode(key),
  "\nmac: ",
  decode(mac, "hex")
);
