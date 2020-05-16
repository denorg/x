import BufferPool from "./Pool/BufferPool.ts";
import Buffer from "./Buffer.ts";

let buffer = BufferPool.TakeBuffer(128);
BufferPool.ReturnBuffer(buffer);
