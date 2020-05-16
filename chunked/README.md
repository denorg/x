deno-chunked
============

> A set of functions to read `ArrayBuffer` chunk by chunk or buffered until eof.

[![Travis](http://img.shields.io/travis/aynik/deno-chunked.svg?style=flat)](http://travis-ci.org/aynik/deno-chunked) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/aynik/deno-chunked?branch=master&svg=true)](https://ci.appveyor.com/project/aynik/deno-chunked)

---

## Import

```ts
import { concatChunks, readChunks, readBuffered } from "https://deno.land/x/deno-chunked/mod.ts";
```

---

## Usage

```ts
import { concatChunks, readChunks, readBuffered } from "https://deno.land/x/deno-chunked/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

async function main(): Promise<void> {
  let chunk: Uint8Array;
  let chunks: Uint8Array[];
  let reader: Deno.Reader;

  // concatChunks example
  chunk = concatChunks(Uint8Array, [new Uint8Array([0]), new Uint8Array([1])]);
  assertEquals(chunk, [0, 1])

  // readChunks example
  reader = new Deno.Buffer(new ArrayBuffer(10));
  chunks = [];
  for await (let chunk of readChunks(reader, 1)) {
    chunks.push(chunk);
  }
  assertEquals(chunks, new Array(10).fill(new Uint8Array(1)));

  // readBuffered example
  reader = new Deno.Buffer(new ArrayBuffer(1024));
  assertEquals(
    await readBuffered(reader, { chunkSize: 1 }),
    new Uint8Array(1024)
  );
}

main();
```

---

## API

---

### Interfaces

* [ReadBufferedOptions](#readbufferedoptions)

### Type aliases

* [Chunk](#chunk)

### Variables

* [CHUNK_SIZE](#chunk_size)

### Functions

* [concatChunks](#concatchunks)
* [readBuffered](#readbuffered)
* [readChunks](#readchunks)

---

## Interfaces

### ReadBufferedOptions

A set of options for the `readBuffered` function.

*chunkSize*: (optional) Amount of bytes that will be read per chunk

## Type aliases

<a id="chunk"></a>

###  Chunk

**Ƭ Chunk**: *`Int8Array` \| `Uint8Array` \| `Uint8ClampedArray` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array`*

The types `concatChunks` accepts for inputs and output.

___

## Variables

<a id="chunk_size"></a>

### `<Const>` CHUNK_SIZE

**● CHUNK_SIZE**: *`4096`* = 4096

Mirrors [https://github.com/denoland/deno\_std/blob/master/io/bufio.ts](https://github.com/denoland/deno_std/blob/master/io/bufio.ts)

___

## Functions

<a id="concatchunks"></a>

###  concatChunks

▸ **concatChunks**<`ChunkType`>(ChunkConstructor: *`object`*, chunks: *`ChunkType`[]*): `ChunkType`

Concatenates a list of chunks (typed arrays).

**Type parameters:**

#### ChunkType :  [Chunk](#chunk)
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ChunkConstructor | `object` |  Which constructor will be used to contain the result |
| chunks | `ChunkType`[] |  A list of chunks to concatenate |

**Returns:** `ChunkType`

___
<a id="readbuffered"></a>

###  readBuffered

▸ **readBuffered**(reader: *`Deno.Reader`*, __namedParameters?: *`object`*): `Promise`<`Uint8Array`>

Reads all output from a `Reader` until eof.

**Parameters:**

**reader: `Deno.Reader`**

A `Deno.Reader` to read data from

**`Default value` __namedParameters: `object`**

| Name | Type | Default value |
| ------ | ------ | ------ |
| chunkSize | `number` |  CHUNK_SIZE |

**Returns:** `Promise`<`Uint8Array`>

___
<a id="readchunks"></a>

###  readChunks

▸ **readChunks**(reader: *`Deno.Reader`*, chunkSize: *`number`*): `AsyncIterableIterator`<`Uint8Array`>

Yields all chunks read from a `Reader` until eof.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| reader | `Deno.Reader` |  A \`Deno.Reader\` to read data from |
| chunkSize | `number` |  Amount of bytes that will be read per chunk |

**Returns:** `AsyncIterableIterator`<`Uint8Array`>

___


