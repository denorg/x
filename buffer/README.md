# buffer

[![Build Status](https://travis-ci.com/socket-deno/buffer.svg?branch=master)](https://travis-ci.com/socket-deno/buffer)

Extreme buffer module for deno

```Ts
import {Buffer, BufferPool} from "https://deno.land/x/buffer/mod.ts";

let buffer: Buffer = new Buffer(20);
buffer.append_UInt32(0); // Set Length Space (size : 4, total 
buffer.append_UInt16(1); // Set Type Data (size : 2, total : 6
buffer.append_UInt16(1000); // Set Data 2 (size : 2, total : 8
buffer.set_front_Int32(buffer.Count); // Set Length Data

await conn.write(buffer.Buffer);
```
