import BitConverter, { StringType } from "./BitConverter.ts";
import { IDisposable } from "./using.ts";
import BufferPool from "./Pool/BufferPool.ts";

/**
 * Use this with Using statement
 */
export default class Buffer implements IDisposable {
  private buffer: number[] = [];

  private size: number = 0;
  private offset: number = 0;
  private count: number = 0;

  public get Buffer(): Uint8Array {
    return new Uint8Array(this.buffer);
  }
  public set Buffer(v: Uint8Array) {
    this.buffer = Array.from(v);
  }

  public get Offset(): number {
    return this.offset;
  }
  public set Offset(v: number) {
    this.offset = v;
  }

  public get Count(): number {
    return this.count;
  }
  public set Count(v: number) {
    this.count = v;
  }

  public get capacity(): number {
    return this.buffer.length;
  }

  public constructor(pBuffer: number[], pOffset: number, pCount: number);
  public constructor(pSize: number);
  public constructor(
    pSizeOrBuffer: number[] | number,
    pOffset?: number,
    pCount?: number
  ) {
    if (typeof pSizeOrBuffer == "number") {
      // constructor(pBuffer : number[], pOffset : number, pCount : number);
      this.buffer = new Array<number>(pSizeOrBuffer);
      this.offset = 0;
      this.count = 0;
    } // constructor(pSize : number);
    else {
      this.buffer = pSizeOrBuffer;
      this.offset = pOffset as number;
      this.count = pCount as number;
    }
  }

  public dispose(): void {
    BufferPool.ReturnBuffer(this.buffer);
    return;
  }

  public Clone(): Buffer {
    let tempBuffer: number[] = this.buffer;
    return new Buffer(tempBuffer, this.offset, this.count);
  }

  public Clear(): Uint8Array {
    let tempBuffer: Uint8Array = new Uint8Array(this.buffer);

    this.buffer = [];
    this.offset = 0;
    this.count = 0;

    return tempBuffer;
  }

  public Empty(): boolean {
    return this.buffer == null;
  }

  public Skip(count: number) {
    this.offset += count;
  }

  //#region append_Data
  public append_UInt8(arg: number) {
    this.buffer[this.offset + this.count] = arg;

    this.count++;
  }
  public append_UInt16(arg: number) {
    let tempArray: number[] = BitConverter.UInt16ToBytes(arg);

    let index = this.offset + this.count;

    this.buffer[index + 0] = tempArray[0];
    this.buffer[index + 1] = tempArray[1];

    this.count += 2;
  }
  public append_UInt32(arg: number) {
    let tempArray: number[] = BitConverter.UInt32ToBytes(arg);

    let index = this.offset + this.count;

    this.buffer[index + 0] = tempArray[0];
    this.buffer[index + 1] = tempArray[1];
    this.buffer[index + 2] = tempArray[2];
    this.buffer[index + 3] = tempArray[3];

    this.count += 4;
  }
  public append_UInt64(arg: number) {
    let tempArray: number[] = BitConverter.UInt64ToBytes(arg);

    let index = this.offset + this.count;

    this.buffer[index + 0] = tempArray[0];
    this.buffer[index + 1] = tempArray[1];
    this.buffer[index + 2] = tempArray[2];
    this.buffer[index + 3] = tempArray[3];
    this.buffer[index + 4] = tempArray[4];
    this.buffer[index + 5] = tempArray[5];
    this.buffer[index + 6] = tempArray[6];
    this.buffer[index + 7] = tempArray[7];

    this.count += 8;
  }

  public append_Int8(arg: number) {
    this.buffer[this.offset + this.count] = arg;

    this.count++;
  }
  public append_Int16(arg: number) {
    let tempArray: number[] = BitConverter.Int16ToBytes(arg);

    let index = this.offset + this.count;

    this.buffer[index + 0] = tempArray[0];
    this.buffer[index + 1] = tempArray[1];

    this.count += 2;
  }
  public append_Int32(arg: number) {
    let tempArray: number[] = BitConverter.Int32ToBytes(arg);

    let index = this.offset + this.count;

    this.buffer[index + 0] = tempArray[0];
    this.buffer[index + 1] = tempArray[1];
    this.buffer[index + 2] = tempArray[2];
    this.buffer[index + 3] = tempArray[3];

    this.count += 4;
  }
  public append_Int64(arg: number) {
    let tempArray: number[] = BitConverter.Int64ToBytes(arg);

    let index = this.offset + this.count;

    this.buffer[index + 0] = tempArray[0];
    this.buffer[index + 1] = tempArray[1];
    this.buffer[index + 2] = tempArray[2];
    this.buffer[index + 3] = tempArray[3];
    this.buffer[index + 4] = tempArray[4];
    this.buffer[index + 5] = tempArray[5];
    this.buffer[index + 6] = tempArray[6];
    this.buffer[index + 7] = tempArray[7];

    this.count += 8;
  }

  public append_String(arg: string, type: StringType = StringType.Utf16) {
    let tempArray: number[] = BitConverter.StringToBytes(arg, type, true);
    let tempCount = 0;
    if (type == StringType.Utf8) {
      tempCount = tempArray.length; // \0 이 포함된 길이
    } else {
      tempCount = arg.length + 1; // \0 을 더함
    }
    this.append_UInt16(tempCount);

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[this.offset + this.count + i] = tempArray[i];
    }

    this.count += BitConverter.CharSize(type) * tempCount;
  }
  public append_Text(arg: string, type: StringType = StringType.Utf16) {
    let tempArray: number[] = BitConverter.StringToBytes(arg, type, true);
    let tempCount = 0;
    if (type == StringType.Utf8) {
      tempCount = tempArray.length; // \0 이 포함된 길이
    } else {
      tempCount = arg.length + 1; // \0 을 더함
    }

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[this.offset + this.count + i] = tempArray[i];
    }
    this.count += BitConverter.CharSize(type) * tempCount;
  }
  //#endregion

  //#region extract_Data
  public extract_UInt8(): number {
    let tempData: number = BitConverter.BytesToUInt8(this.buffer, this.offset);
    this.count--;
    this.offset++;
    return tempData;
  }
  public extract_UInt16(): number {
    let tempData: number = BitConverter.BytesToUInt16(this.buffer, this.offset);
    this.count -= 2;
    this.offset += 2;
    return tempData;
  }
  public extract_UInt32(): number {
    let tempData: number = BitConverter.BytesToUInt32(this.buffer, this.offset);
    this.count -= 4;
    this.offset += 4;
    return tempData;
  }
  public extract_UInt64(): number {
    let tempData: number = BitConverter.BytesToUInt64(this.buffer, this.offset);
    this.count -= 8;
    this.offset += 8;
    return tempData;
  }

  public extract_Int8(): number {
    let tempData: number = BitConverter.BytesToInt8(this.buffer, this.offset);
    this.count--;
    this.offset++;
    return tempData;
  }
  public extract_Int16(): number {
    let tempData: number = BitConverter.BytesToInt16(this.buffer, this.offset);
    this.count -= 2;
    this.offset += 2;
    return tempData;
  }
  public extract_Int32(): number {
    let tempData: number = BitConverter.BytesToInt32(this.buffer, this.offset);
    this.count -= 4;
    this.offset += 4;
    return tempData;
  }
  public extract_Int64(): number {
    let tempData: number = BitConverter.BytesToInt64(this.buffer, this.offset);
    this.count -= 8;
    this.offset += 8;
    return tempData;
  }

  public extract_String(type: StringType = StringType.Utf16): string {
    let tempData: string = "";

    let stringCount =
      BitConverter.CharSize(type) * this.extract_Int16() -
      BitConverter.CharSize(type);

    tempData = BitConverter.BytesToString(
      this.buffer.slice(this.offset, this.offset + stringCount),
      type
    );

    this.count -= BitConverter.CharSize(type); // /0의 사이즈
    this.count -= stringCount;

    this.offset += BitConverter.CharSize(type);
    this.offset += stringCount;

    return tempData;
  }
  public extract_Text(type: StringType = StringType.Utf16): string {
    let tempData: string = "";
    let charSize: number = BitConverter.CharSize(type);
    let subarray: number[] = this.buffer.slice(this.offset);
    let nullPos: number = 0;

    for (let i = 0; i < subarray.length / charSize; i += charSize) {
      // offset다음에서 가장 가까운 \0 을 찾음
      let isNull = true;
      for (let j = 0; j < charSize; j++) {
        isNull = isNull && subarray[i + j] == 0;
      }
      if (isNull) {
        nullPos = i;
        break;
      }
    }

    tempData = BitConverter.BytesToString(
      this.buffer.slice(this.offset, this.offset + nullPos),
      type
    );

    this.count -= BitConverter.CharSize(type); // /0의 사이즈
    this.count -= nullPos;

    this.offset += BitConverter.CharSize(type);
    this.offset += nullPos;

    return tempData;
  }
  //#endregion

  //#region set_front_Data
  public set_front_UInt8(arg: number, offset: number = 0) {
    this.buffer[offset] = arg;
  }
  public set_front_UInt16(arg: number, offset: number = 0) {
    let tempArray: number[] = BitConverter.UInt16ToBytes(arg);

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[offset + i] = tempArray[i];
    }
  }
  public set_front_UInt32(arg: number, offset: number = 0) {
    let tempArray: number[] = BitConverter.UInt32ToBytes(arg);

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[offset + i] = tempArray[i];
    }
  }
  public set_front_UInt64(arg: number, offset: number = 0) {
    let tempArray: number[] = BitConverter.UInt64ToBytes(arg);

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[offset + i] = tempArray[i];
    }
  }

  public set_front_Int8(arg: number, offset: number = 0) {
    this.buffer[offset] = arg;

    this.count++;
  }
  public set_front_Int16(arg: number, offset: number = 0) {
    let tempArray: number[] = BitConverter.Int16ToBytes(arg);

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[offset + i] = tempArray[i];
    }
    this.count += 2;
  }
  public set_front_Int32(arg: number, offset: number = 0) {
    let tempArray: number[] = BitConverter.Int32ToBytes(arg);

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[offset + i] = tempArray[i];
    }

    this.count += 4;
  }
  public set_front_Int64(arg: number, offset: number = 0) {
    let tempArray: number[] = BitConverter.Int64ToBytes(arg);

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[offset + i] = tempArray[i];
    }

    this.count += 8;
  }

  public set_front_String(
    arg: string,
    offset: number = 0,
    type: StringType = StringType.Utf16
  ) {
    let tempArray: number[] = BitConverter.StringToBytes(arg, type, true);
    let tempCount = 0;
    if (type == StringType.Utf8) {
      tempCount = tempArray.length; // \0 이 포함된 길이
    } else {
      tempCount = arg.length + 1; // \0 을 더함
    }
    this.set_front_Int16(tempCount, offset);

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[offset + 2 + i] = tempArray[i];
    }

    this.count += BitConverter.CharSize(type) * tempCount;
  }
  public set_front_Text(
    arg: string,
    offset: number = 0,
    type: StringType = StringType.Utf16
  ) {
    let tempArray: number[] = BitConverter.StringToBytes(arg, type, true);
    let tempCount = 0;
    if (type == StringType.Utf8) {
      tempCount = tempArray.length; // \0 이 포함된 길이
    } else {
      tempCount = arg.length + 1; // \0 을 더함
    }

    for (let i = 0; i < tempArray.length; i++) {
      this.buffer[offset + i] = tempArray[i];
    }
    this.count += BitConverter.CharSize(type) * tempCount;
  }
  //#endregion

  //#region get_front_Data
  public get_front_UInt8(offset: number = 0): number {
    let tempData: number = BitConverter.BytesToUInt8(this.buffer, offset);

    return tempData;
  }
  public get_front_UInt16(offset: number = 0): number {
    let tempData: number = BitConverter.BytesToUInt16(this.buffer, offset);

    return tempData;
  }
  public get_front_UInt32(offset: number = 0): number {
    let tempData: number = BitConverter.BytesToUInt32(this.buffer, offset);

    return tempData;
  }
  public get_front_UInt64(offset: number = 0): number {
    let tempData: number = BitConverter.BytesToUInt64(this.buffer, offset);

    return tempData;
  }

  public get_front_Int8(offset: number = 0): number {
    let tempData: number = BitConverter.BytesToInt8(this.buffer, offset);

    return tempData;
  }
  public get_front_Int16(offset: number = 0): number {
    let tempData: number = BitConverter.BytesToInt16(this.buffer, offset);

    return tempData;
  }
  public get_front_Int32(offset: number = 0): number {
    let tempData: number = BitConverter.BytesToInt32(this.buffer, offset);

    return tempData;
  }
  public get_front_Int64(offset: number = 0): number {
    let tempData: number = BitConverter.BytesToInt64(this.buffer, offset);

    return tempData;
  }

  public get_front_String(
    offset: number = 0,
    type: StringType = StringType.Utf16
  ): string {
    let tempData: string = "";

    let stringCount =
      BitConverter.CharSize(type) * this.get_front_Int16(offset) -
      BitConverter.CharSize(type);

    tempData = BitConverter.BytesToString(
      this.buffer.slice(offset + 2 + stringCount),
      type
    );

    this.count -= BitConverter.CharSize(type); // /0의 사이즈
    this.count -= stringCount;

    this.offset += BitConverter.CharSize(type);
    this.offset += stringCount;

    return tempData;
  }
  public get_front_Text(
    offset: number = 0,
    type: StringType = StringType.Utf16
  ): string {
    let tempData: string = "";
    let charSize: number = BitConverter.CharSize(type);
    let subarray: number[] = this.buffer.slice(offset);
    let nullPos: number = 0;

    for (let i = 0; i < subarray.length / charSize; i += charSize) {
      // offset다음에서 가장 가까운 \0 을 찾음
      let isNull = true;
      for (let j = 0; j < charSize; j++) {
        isNull = isNull && subarray[i + j] == 0;
      }
      if (isNull) {
        nullPos = i;
        break;
      }
    }

    tempData = BitConverter.BytesToString(
      this.buffer.slice(offset + nullPos),
      type
    );

    this.count -= BitConverter.CharSize(type); // /0의 사이즈
    this.count -= nullPos;

    this.offset += BitConverter.CharSize(type);
    this.offset += nullPos;

    return tempData;
  }
  //#endregion
}
