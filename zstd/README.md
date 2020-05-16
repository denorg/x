# deno-zstd

Zstd bindings for the Deno TypeScript/JavaScript runtime

## Usage

```ts
const encoder = new TextEncoder();
const data = encoder.encode("hello world");
const compressed = compress(data, 22);
if(compressed) const decompressed = decompress(compressed);
console.log(decompressed);
```
