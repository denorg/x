import {
  assertThrows,
  assertEquals,
  assertNotEquals
} from "https://deno.land/std/testing/asserts.ts";
const { test } = Deno;

import BitConverter, { StringType } from "../BitConverter.ts";

test({
  name: "Test UInt8",
  fn(): void {
    let data: number = 100;
    let UInt8ToBytes = BitConverter.UInt8ToBytes(data);
    let BytesToUInt8 = BitConverter.BytesToUInt8(UInt8ToBytes);
    assertEquals(data, BytesToUInt8);
  }
});
test({
  name: "Test UInt16",
  fn(): void {
    let data: number = 100;
    let UInt16ToBytes = BitConverter.UInt16ToBytes(data);
    let BytesToUInt16 = BitConverter.BytesToUInt16(UInt16ToBytes);
    assertEquals(data, BytesToUInt16);
  }
});
test({
  name: "Test UInt32",
  fn(): void {
    let data: number = 2200000000;
    let UInt32ToBytes = BitConverter.UInt32ToBytes(data);
    let BytesToUInt32 = BitConverter.BytesToUInt32(UInt32ToBytes);
    assertEquals(data, BytesToUInt32);
  }
});
test({
  name: "Test UInt64",
  fn(): void {
    let data: number = Number.MAX_SAFE_INTEGER;
    let UInt64ToBytes = BitConverter.UInt64ToBytes(data);
    let BytesToUInt64 = BitConverter.BytesToUInt64(UInt64ToBytes);
    assertEquals(data, BytesToUInt64);
  }
});

test({
  name: "Test UInt64 Throw MAX_SAFE_INTEGER",
  fn(): void {
    assertThrows(() => {
      let data: number = Number.MAX_SAFE_INTEGER + 1;
      let UInt64ToBytes = BitConverter.UInt64ToBytes(data);
      let BytesToUInt64 = BitConverter.BytesToUInt64(UInt64ToBytes);
    });
  }
});
test({
  name: "Test UInt64 Throw MIN_SAFE_INTEGER",
  fn(): void {
    assertThrows(() => {
      let data: number = Number.MIN_SAFE_INTEGER - 1;
      let UInt64ToBytes = BitConverter.UInt64ToBytes(data);
      let BytesToUInt64 = BitConverter.BytesToUInt64(UInt64ToBytes);
    });
  }
});
test({
  name: "Test Int8",
  fn(): void {
    {
      let data: number = -100;
      let Int8ToBytes = BitConverter.Int8ToBytes(data);
      let BytesToUInt8 = BitConverter.BytesToInt8(Int8ToBytes);
      assertEquals(data, BytesToUInt8);
    }

    {
      let data: number = 100;
      let Int8ToBytes = BitConverter.Int8ToBytes(data);
      let BytesToUInt8 = BitConverter.BytesToInt8(Int8ToBytes);
      assertEquals(data, BytesToUInt8);
    }
  }
});
test({
  name: "Test Int16",
  fn(): void {
    {
      let data: number = -30000;
      let Int16ToBytes = BitConverter.Int16ToBytes(data);
      let BytesToInt16 = BitConverter.BytesToInt16(Int16ToBytes);
      assertEquals(data, BytesToInt16);
    }

    {
      let data: number = 30000;
      let Int16ToBytes = BitConverter.Int16ToBytes(data);
      let BytesToInt16 = BitConverter.BytesToInt16(Int16ToBytes);
      assertEquals(data, BytesToInt16);
    }
  }
});
test({
  name: "Test Int32",
  fn(): void {
    {
      let data: number = -2000000000;
      let Int32ToBytes = BitConverter.Int32ToBytes(data);
      let BytesToInt32 = BitConverter.BytesToInt32(Int32ToBytes);
      assertEquals(data, BytesToInt32);
    }

    {
      let data: number = 2000000000;
      let Int32ToBytes = BitConverter.Int32ToBytes(data);
      let BytesToInt32 = BitConverter.BytesToInt32(Int32ToBytes);
      assertEquals(data, BytesToInt32);
    }
  }
});
test({
  name: "Test Int64",
  fn(): void {
    {
      let data: number = -100000000000000;
      let Int64ToBytes = BitConverter.Int64ToBytes(data);
      let BytesToInt64 = BitConverter.BytesToInt64(Int64ToBytes);
      assertEquals(data, BytesToInt64);
    }

    {
      let data: number = 100000000000000;
      let Int64ToBytes = BitConverter.Int64ToBytes(data);
      let BytesToInt64 = BitConverter.BytesToInt64(Int64ToBytes);
      assertEquals(data, BytesToInt64);
    }
  }
});

test({
  name: "Test Int64 Throw MAX_SAFE_INTEGER",
  fn(): void {
    assertThrows(() => {
      let data: number = Number.MAX_SAFE_INTEGER + 1;
      let Int64ToBytes = BitConverter.Int64ToBytes(data);
      let BytesToInt64 = BitConverter.BytesToInt64(Int64ToBytes);
    });
  }
});
test({
  name: "Test Int64 Throw MIN_SAFE_INTEGER",
  fn(): void {
    assertThrows(() => {
      let data: number = Number.MIN_SAFE_INTEGER - 1;
      let Int64ToBytes = BitConverter.Int64ToBytes(data);
      let BytesToInt64 = BitConverter.BytesToInt64(Int64ToBytes);
    });
  }
});

test({
  name: "Test utf-8 string",
  fn(): void {
    let data: string =
      "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    let Utf8StringToBytes = BitConverter.StringToBytes(data, StringType.Utf8);
    let BytesToStringUtf8 = BitConverter.BytesToString(
      Utf8StringToBytes,
      StringType.Utf8
    );
    assertEquals(data, BytesToStringUtf8);
  }
});
test({
  name: "Test utf-16 string",
  fn(): void {
    let data: string =
      "this is utf-16 string 한글도 가능 1234567!@#$%%^&}¢‡¥”w¯¥„ÈÉÞ´µ½²ÂÄÂÁ¾¿ÀÁÂ";
    let Utf16StringToBytes = BitConverter.StringToBytes(data, StringType.Utf16);
    let BytesToStringUtf16 = BitConverter.BytesToString(
      Utf16StringToBytes,
      StringType.Utf16
    );
    assertEquals(data, BytesToStringUtf16);
  }
});

test({
  name: "Test utf-8 string with NullCharacter(\\0)",
  fn(): void {
    let data: string =
      "!#$%^ %godream1^^%@ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    let Utf8StringToBytes = BitConverter.StringToBytes(
      data,
      StringType.Utf8,
      true
    );
    let BytesToStringUtf8 = BitConverter.BytesToString(
      Utf8StringToBytes,
      StringType.Utf8
    );
    assertEquals(data + "\0", BytesToStringUtf8);
  }
});
test({
  name: "Test utf-16 string with NullCharacter(\\0)",
  fn(): void {
    let data: string =
      "this is utf-16 string 한글도 가능 1234567!@#$%%^&}¢‡¥”w¯¥„ÈÉÞ´µ½²ÂÄÂÁ¾¿ÀÁÂ";
    let Utf16StringToBytes = BitConverter.StringToBytes(
      data,
      StringType.Utf16,
      true
    );
    let BytesToStringUtf16 = BitConverter.BytesToString(
      Utf16StringToBytes,
      StringType.Utf16
    );
    assertEquals(data + "\0", BytesToStringUtf16);
  }
});
