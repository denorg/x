import { runBenchmarks, bench } from "https://deno.land/std/testing/bench.ts";

import BitConverter, { StringType } from "../BitConverter.ts";

bench({
  name: "Test UInt8_X_1e6",
  runs: 1000,
  func(b): void {
    let data: number = 250;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let UInt8ToBytes = BitConverter.UInt8ToBytes(data);
      BitConverter.BytesToUInt8(UInt8ToBytes);
    }
    b.stop();
  }
});

bench({
  name: "Test UInt16_X_1e6",
  runs: 1000,
  func(b): void {
    let data: number = 65000;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let UInt16ToBytes = BitConverter.UInt16ToBytes(data);
      BitConverter.BytesToUInt16(UInt16ToBytes);
    }
    b.stop();
  }
});

bench({
  name: "Test UInt32_X_1e6",
  runs: 1000,
  func(b): void {
    let data: number = 4200000000;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let UInt32ToBytes = BitConverter.UInt32ToBytes(data);
      BitConverter.BytesToUInt32(UInt32ToBytes);
    }
    b.stop();
  }
});

bench({
  name: "Test UInt64_X_1e6",
  runs: 1000,
  func(b): void {
    let data: number = 123451234512345;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let UInt64ToBytes = BitConverter.UInt64ToBytes(data);
      BitConverter.BytesToUInt64(UInt64ToBytes);
    }
    b.stop();
  }
});

bench({
  name: "Test Int8_X_1e6",
  runs: 1000,
  func(b): void {
    let data: number = -120;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let Int8ToBytes = BitConverter.Int8ToBytes(data);
      BitConverter.BytesToInt8(Int8ToBytes);
    }
    b.stop();
  }
});

bench({
  name: "Test Int16_X_1e6",
  runs: 1000,
  func(b): void {
    let data: number = -30000;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let Int16ToBytes = BitConverter.Int16ToBytes(data);
      BitConverter.BytesToInt16(Int16ToBytes);
    }
    b.stop();
  }
});

bench({
  name: "Test Int32_X_1e6",
  runs: 1000,
  func(b): void {
    let data: number = -2000000000;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let Int32ToBytes = BitConverter.Int32ToBytes(data);
      BitConverter.BytesToInt32(Int32ToBytes);
    }
    b.stop();
  }
});

bench({
  name: "Test Int64_X_1e6",
  runs: 1000,
  func(b): void {
    let data: number = -123451234512345;
    b.start();
    for (let i = 0; i < 1e6; i++) {
      let Int64ToBytes = BitConverter.Int64ToBytes(data);
      BitConverter.BytesToInt64(Int64ToBytes);
    }
    b.stop();
  }
});

bench({
    name: "Test utf8 string_X_1e4",
    runs: 100,
    func(b): void {
        let data: string = "1234567!@#$%%^&}¢‡¥”w¯¥„ÈÉÞ´µ½²ÂÄÂÁ¾¿ÀÁÂ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
        b.start();
        for (let i = 0; i < 1e4; i++)
        {
            let UInt8ToBytes = BitConverter.StringToBytes(data, StringType.Utf8);
            BitConverter.BytesToString(UInt8ToBytes, StringType.Utf8);
        }
        b.stop();
    }
});

bench({
  name: "Test utf16 string_X_1e4",
  runs: 100,
  func(b): void {
    let data: string =
      "1234567!@#$%%^&}¢‡¥”w¯¥„ÈÉÞ´µ½²ÂÄÂÁ¾¿ÀÁÂ Hello Tạm biệt ഗുഡ്ബൈ 高仁福 나라말싸미, 말싸밓, 말쌓밒";
    b.start();
    for (let i = 0; i < 1e4; i++) {
      let UInt8ToBytes = BitConverter.StringToBytes(data, StringType.Utf16);
      BitConverter.BytesToString(UInt8ToBytes, StringType.Utf16);
    }
    b.stop();
  }
});

runBenchmarks();
