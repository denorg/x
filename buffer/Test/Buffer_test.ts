import {
  assertThrows,
  assertEquals,
  assertNotEquals
} from "https://deno.land/std/testing/asserts.ts";
const { test } = Deno;

import Buffer from "../Buffer.ts";
import { StringType } from "../BitConverter.ts";

Deno.test({
  name: "Test UInt8",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: number = 100;
    buffer.append_UInt8(appendData);
    let extractData = buffer.extract_UInt8();
    assertEquals(appendData, extractData);
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test UInt16",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: number = 10000;
    buffer.append_UInt16(appendData);
    let extractData = buffer.extract_UInt16();
    assertEquals(appendData, extractData);
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test UInt32",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: number = 100000000;
    buffer.append_UInt32(appendData);
    let extractData = buffer.extract_UInt32();
    assertEquals(appendData, extractData);
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test UInt64",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: number = 10000000000;
    buffer.append_UInt64(appendData);
    let extractData = buffer.extract_UInt64();
    assertEquals(appendData, extractData);
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});

test({
  name: "Test Int8",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: number = -100;
    buffer.append_Int8(appendData);
    let extractData = buffer.extract_Int8();
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test Int16",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: number = -1000;
    buffer.append_Int16(appendData);
    let extractData = buffer.extract_Int16();
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test Int32",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: number = -100000000;
    buffer.append_Int32(appendData);
    let extractData = buffer.extract_Int32();
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test Int64",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: number = -100000000000;
    buffer.append_Int64(appendData);
    let extractData = buffer.extract_Int64();
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});

test({
  name: "Test String(utf-16)",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: string =
      "this is test string 한글도 가능 1234567!@#$%%^&}¢‡¥”w¯¥„ÈÉÞ´µ½²ÂÄÂÁ¾¿ÀÁÂ";
    buffer.append_String(appendData);
    let extractData = buffer.extract_String();
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test Text(utf-16)",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: string =
      "this is test string 한글도 가능 1234567!@#$%%^&}¢‡¥”w¯¥„ÈÉÞ´µ½²ÂÄÂÁ¾¿ÀÁÂ";
    buffer.append_Text(appendData);
    let extractData = buffer.extract_Text();
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});

test({
  name: "Test String(utf-8)",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: string =
      "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    buffer.append_String(appendData, StringType.Utf8);
    let extractData = buffer.extract_String(StringType.Utf8);
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test Text(utf-8)",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);
    let appendData: string =
      "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    buffer.append_Text(appendData, StringType.Utf8);
    let extractData = buffer.extract_Text(StringType.Utf8);
    assertEquals(appendData, extractData, "data check");
    assertEquals(buffer.Count, 0, "count check");
  }
});

test({
  name: "Test AllData1",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);

    {
      let appendData: number = 254;
      buffer.append_UInt8(appendData);
      let extractData = buffer.extract_UInt8();

      assertEquals(appendData, extractData, "append UInt8");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: number = 65532;
      buffer.append_UInt16(appendData);
      let extractData = buffer.extract_UInt16();

      assertEquals(appendData, extractData, "append UInt16");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: number = 2200000000;
      buffer.append_UInt32(appendData);
      let extractData = buffer.extract_UInt32();

      assertEquals(appendData, extractData, "append UInt32");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: number = 1234567890101112;
      buffer.append_UInt64(appendData);
      let extractData = buffer.extract_UInt64();

      assertEquals(appendData, extractData, "append UInt32");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: number = -120;
      buffer.append_Int8(appendData);
      let extractData = buffer.extract_Int8();

      assertEquals(appendData, extractData, "append Int8");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: number = -30000;
      buffer.append_Int16(appendData);
      let extractData = buffer.extract_Int16();

      assertEquals(appendData, extractData, "append Int16");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: number = -2100000000;
      buffer.append_Int32(appendData);
      let extractData = buffer.extract_Int32();

      assertEquals(appendData, extractData, "append Int32");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: number = -12345678901011;
      buffer.append_Int64(appendData);
      let extractData = buffer.extract_Int64();

      assertEquals(appendData, extractData, "append Int32");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: string =
        "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
      buffer.append_Text(appendData, StringType.Utf8);
      let extractData = buffer.extract_Text(StringType.Utf8);

      assertEquals(appendData, extractData, "append Utf8 text");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: string =
        "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
      buffer.append_String(appendData, StringType.Utf8);
      let extractData = buffer.extract_String(StringType.Utf8);

      assertEquals(appendData, extractData, "append Utf8 string");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: string =
        "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
      buffer.append_Text(appendData, StringType.Utf16);
      let extractData = buffer.extract_Text(StringType.Utf16);

      assertEquals(appendData, extractData, "append Utf16 text");
      assertEquals(buffer.Count, 0, "count check");
    }

    {
      let appendData: string =
        "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
      buffer.append_String(appendData, StringType.Utf16);
      let extractData = buffer.extract_String(StringType.Utf16);

      assertEquals(appendData, extractData, "append Utf16 string");
      assertEquals(buffer.Count, 0, "count check");
    }
    assertEquals(buffer.Count, 0, "count check");
  }
});
test({
  name: "Test AllData2",
  fn(): void {
    let buffer: Buffer = new Buffer(1024);

    let appendData1: number = 240;
    buffer.append_UInt8(appendData1);

    let appendData2: number = 240;
    buffer.append_UInt16(appendData2);

    let appendData3: number = 240;
    buffer.append_UInt32(appendData3);

    let appendData4: string =
      "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    buffer.append_Text(appendData4, StringType.Utf8);

    let appendData5: string =
      "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    buffer.append_String(appendData5, StringType.Utf8);

    let appendData6: string =
      "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    buffer.append_Text(appendData6, StringType.Utf16);

    let appendData7: string =
      "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    buffer.append_String(appendData7, StringType.Utf16);

    let extractData1 = buffer.extract_UInt8();
    assertEquals(appendData1, extractData1, "append UInt8");

    let extractData2 = buffer.extract_UInt16();
    assertEquals(appendData2, extractData2, "append UInt16");

    let extractData3 = buffer.extract_UInt32();
    assertEquals(appendData3, extractData3, "append UInt32");

    let extractData4 = buffer.extract_Text(StringType.Utf8);
    assertEquals(appendData4, extractData4, "append Utf8 text");

    let extractData5 = buffer.extract_String(StringType.Utf8);
    assertEquals(appendData5, extractData5, "append Utf8 string");

    let extractData6 = buffer.extract_Text(StringType.Utf16);
    assertEquals(appendData6, extractData6, "append Utf16 text");

    let extractData7 = buffer.extract_String(StringType.Utf16);
    assertEquals(appendData7, extractData7, "append Utf16 string");
  }
});
