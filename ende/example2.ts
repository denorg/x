import { en, de, enc, dec, encode, decode } from './mod.ts';

const log = (x: string) => console.log(x);
const write = (x: Uint8Array) => Deno.stdout.write(x);

const eq = encode(' = ');

const s: string = 'en/de';
const b: Uint8Array = en(s);
const t: string = de(b);

write(b);
write(eq);
log(t);

const str: string = 'enc/dec';
const buf: Uint8Array = enc(str);
const txt: string = dec(buf);

write(buf);
write(eq);
log(txt);

const string: string = 'enccode/decode';
const buffer: Uint8Array = encode(string);
const text: string = decode(buffer);

write(buffer);
write(eq);
log(text);
