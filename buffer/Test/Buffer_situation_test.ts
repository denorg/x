import {
  assertThrows,
  assertEquals,
  assertNotEquals
} from "https://deno.land/std/testing/asserts.ts";

import Buffer from "../Buffer.ts";
import { StringType } from "../BitConverter.ts";
const { test } = Deno;

test({
  name: "Test Buffer with header1",
  fn(): void {
    // ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
    // │  L e n g t h  │  Type │   D  a  t  a...   │
    // └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

    let buffer: Buffer = new Buffer(1024);
    let appendData: number = 100;
    buffer.append_UInt32(0); // Set Length Space (size : 4, total : 4)
    buffer.append_UInt16(1); // Set Type Data (size : 2, total : 6)

    buffer.append_String("Name"); // Set Data 1 (size : 12, total : 18)
    buffer.append_UInt16(1000); // Set Data 2 (size : 2, total : 20)
    buffer.append_UInt16(2000); // Set Data 3 (size : 2, total : 22)
    buffer.append_UInt16(3000); // Set Data 4 (size : 2, total : 24)
    buffer.append_UInt16(4000); // Set Data 5 (size : 2, total : 26)

    buffer.set_front_Int32(buffer.Count); // Set Length Data

    // Send to Client/Server

    let recvBuffer = buffer.Clone();

    let length = recvBuffer.extract_Int32();
    let type = recvBuffer.extract_Int16();

    let data1 = recvBuffer.extract_String();
    let data2 = recvBuffer.extract_Int16();
    let data3 = recvBuffer.extract_Int16();
    let data4 = recvBuffer.extract_Int16();
    let data5 = recvBuffer.extract_Int16();

    assertEquals(26, length, "length check");
    assertEquals(1, type, "type check");

    assertEquals("Name", data1, "data check");
    assertEquals(1000, data2, "data check");
    assertEquals(2000, data3, "data check");
    assertEquals(3000, data4, "data check");
    assertEquals(4000, data5, "data check");
  }
});

test({
  name: "Test Buffer with header2",
  fn(): void {
    // ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
    // │  Type │  Len  │   D  a  t  a...   │
    // └───┴───┴───┴───┴───┴───┴───┴───┴───┘

    let buffer: Buffer = new Buffer(1024);
    let appendData: number = 100;
    buffer.append_UInt16(1); // Set Type Data (size : 2, total : 2)
    buffer.append_UInt16(0); // Set Length Space (size : 2, total : 4)

    buffer.append_String("Name"); // Set Data 1 (size : 12, total : 16)
    buffer.append_UInt16(1000); // Set Data 2 (size : 2, total : 18)
    buffer.append_UInt16(2000); // Set Data 3 (size : 2, total : 20)
    buffer.append_UInt16(3000); // Set Data 4 (size : 2, total : 22)
    buffer.append_UInt16(4000); // Set Data 5 (size : 2, total : 24)

    buffer.set_front_Int16(buffer.Count, 2); // Set Length Data

    // Send to Client/Server

    let recvBuffer = buffer.Clone();

    let type = recvBuffer.extract_Int16();
    let length = recvBuffer.extract_Int16();

    let data1 = recvBuffer.extract_String();
    let data2 = recvBuffer.extract_Int16();
    let data3 = recvBuffer.extract_Int16();
    let data4 = recvBuffer.extract_Int16();
    let data5 = recvBuffer.extract_Int16();

    assertEquals(24, length, "length check");
    assertEquals(1, type, "type check");

    assertEquals("Name", data1, "data check");
    assertEquals(1000, data2, "data check");
    assertEquals(2000, data3, "data check");
    assertEquals(3000, data4, "data check");
    assertEquals(4000, data5, "data check");
  }
});
