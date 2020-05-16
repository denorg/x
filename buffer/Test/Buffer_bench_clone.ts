import { runBenchmarks, bench } from "https://deno.land/std/testing/bench.ts";

import Buffer from "../Buffer.ts";
import { StringType } from "../BitConverter.ts";

bench({
  name: "Test UInt8_X_1e6",
  runs: 100,
  func(b): void {
    let bufferTemp: Buffer = new Buffer(1024);
    let data: number = 250;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let buffer: Buffer = bufferTemp.Clone();
      buffer.append_UInt8(data);
      buffer.extract_UInt8();
    }
    b.stop();
    //console.log(buffer);
  }
});

bench({
  name: "Test UInt16_X_1e6",
  runs: 100,
  func(b): void {
    let bufferTemp: Buffer = new Buffer(1024);
    let data: number = 65000;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let buffer: Buffer = bufferTemp.Clone();
      buffer.append_UInt16(data);
      buffer.extract_UInt16();
    }
    b.stop();
  }
});

bench({
  name: "Test UInt32_X_1e6",
  runs: 100,
  func(b): void {
    let bufferTemp: Buffer = new Buffer(1024);
    let data: number = 4200000000;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let buffer: Buffer = bufferTemp.Clone();
      buffer.append_UInt32(data);
      buffer.extract_UInt32();
    }
    b.stop();
  }
});

bench({
  name: "Test UInt64_X_1e6",
  runs: 100,
  func(b): void {
    let bufferTemp: Buffer = new Buffer(1024);
    let data: number = 1234567891011;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let buffer: Buffer = bufferTemp.Clone();
      buffer.append_UInt64(data);
      buffer.extract_UInt64();
    }
    b.stop();
  }
});

bench({
  name: "Test Int8_X_1e6",
  runs: 100,
  func(b): void {
    let bufferTemp: Buffer = new Buffer(1024);
    let data: number = 250;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let buffer: Buffer = bufferTemp.Clone();
      buffer.append_Int8(data);
      buffer.extract_Int8();
    }
    b.stop();
    //console.log(buffer);
  }
});

bench({
  name: "Test Int16_X_1e6",
  runs: 100,
  func(b): void {
    let bufferTemp: Buffer = new Buffer(1024);
    let data: number = 65000;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let buffer: Buffer = bufferTemp.Clone();
      buffer.append_Int16(data);
      buffer.extract_Int16();
    }
    b.stop();
  }
});

bench({
  name: "Test Int32_X_1e6",
  runs: 100,
  func(b): void {
    let bufferTemp: Buffer = new Buffer(1024);
    let data: number = 4200000000;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let buffer: Buffer = bufferTemp.Clone();
      buffer.append_Int32(data);
      buffer.extract_Int32();
    }
    b.stop();
  }
});

bench({
  name: "Test Int64_X_1e6",
  runs: 100,
  func(b): void {
    let bufferTemp: Buffer = new Buffer(1024);
    let data: number = 1234567891011;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let buffer: Buffer = bufferTemp.Clone();
      buffer.append_Int64(data);
      buffer.extract_Int64();
    }
    b.stop();
  }
});

runBenchmarks();
