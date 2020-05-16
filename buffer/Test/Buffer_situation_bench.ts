import { runBenchmarks, bench } from "https://deno.land/std/testing/bench.ts";

import Buffer from "../Buffer.ts";

bench({
  name: "Test Buffer with header1_X_1e5",
  runs: 100,
  func(b): void {
    // ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
    // │  L e n g t h  │  Type │   D  a  t  a...   │
    // └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

    b.start();
    for (let i = 0; i < 1e5; i++) {
      let buffer: Buffer = new Buffer(1024);
      buffer.append_UInt32(0); // Set Length Space (size : 4, total : 4)
      buffer.append_UInt16(1); // Set Type Data (size : 2, total : 6)

      buffer.append_String("Name"); // Set Data 1 (size : 12, total : 18)
      buffer.append_UInt16(1000); // Set Data 2 (size : 2, totle : 20)
      buffer.append_UInt16(2000); // Set Data 3 (size : 2, totle : 22)
      buffer.append_UInt16(3000); // Set Data 4 (size : 2, totle : 24)
      buffer.append_UInt16(4000); // Set Data 5 (size : 2, totle : 26)

      buffer.set_front_UInt32(buffer.Count); // Set Length Data

      // Send to Client/Server

      let recvBuffer = buffer.Clone();

      let length = recvBuffer.extract_UInt32();
      let type = recvBuffer.extract_UInt16();

      let data1 = recvBuffer.extract_String();
      let data2 = recvBuffer.extract_UInt16();
      let data3 = recvBuffer.extract_UInt16();
      let data4 = recvBuffer.extract_UInt16();
      let data5 = recvBuffer.extract_UInt16();
    }
    b.stop();
  }
});

bench({
  name: "Test Buffer with header2_X_1e5",
  runs: 100,
  func(b): void {
    // ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
    // │  Type │  Len  │   D  a  t  a...   │
    // └───┴───┴───┴───┴───┴───┴───┴───┴───┘

    b.start();
    for (let i = 0; i < 1e5; i++) {
      let buffer: Buffer = new Buffer(1024);
      buffer.append_UInt16(1); // Set Type Data (size : 2, totle : 2)
      buffer.append_UInt16(0); // Set Length Space (size : 2, totle : 4)

      buffer.append_String("Name"); // Set Data 1 (size : 12, totle : 16)
      buffer.append_UInt16(1000); // Set Data 2 (size : 2, totle : 18)
      buffer.append_UInt16(2000); // Set Data 3 (size : 2, totle : 20)
      buffer.append_UInt16(3000); // Set Data 4 (size : 2, totle : 22)
      buffer.append_UInt16(4000); // Set Data 5 (size : 2, totle : 24)

      buffer.set_front_UInt16(buffer.Count, 2); // Set Length Data

      // Send to Client/Server

      let recvBuffer = buffer.Clone();

      let type = recvBuffer.extract_UInt16();
      let length = recvBuffer.extract_UInt16();

      let data1 = recvBuffer.extract_String();
      let data2 = recvBuffer.extract_UInt16();
      let data3 = recvBuffer.extract_UInt16();
      let data4 = recvBuffer.extract_UInt16();
      let data5 = recvBuffer.extract_UInt16();
    }
    b.stop();
  }
});

runBenchmarks();
