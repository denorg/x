export default class BitConverter {
  /**
   * UInt8를 number[]로 변환합니다
   * @param data 변환할 UInt8
   * @returns 변환된number[]
   */
  public static UInt8ToBytes(data: number): number[] {
    return [data];
  }
  /**
   * UInt16를 number[]로 변환합니다
   * @param data 변환할 UInt16
   * @returns 변환된number[]
   */
  public static UInt16ToBytes(data: number): number[] {
    return [(data << 8) >>> 8, data >>> 8];
  }
  /**
   * UInt32를 number[]로 변환합니다
   * @param data 변환할 UInt32
   * @returns 변환된number[]
   */
  public static UInt32ToBytes(data: number): number[] {
    return [
      (data << 24) >>> 24,
      (data << 16) >>> 24,
      (data << 8) >>> 24,
      data >>> 24
    ];
  }
  /**
   * UInt64를 number[]로 변환합니다
   * @param data 변환할 UInt64
   * @returns 변환된number[]
   */
  public static UInt64ToBytes(data: number): number[] {
    var y = Math.floor(data / 0x100000000);
    return [
      (data << 24) >>> 24,
      (data << 16) >>> 24,
      (data << 8) >>> 24,
      data >>> 24,
      (y << 24) >>> 24,
      (y << 16) >>> 24,
      (y << 8) >>> 24,
      y >>> 24
    ];
  }

  /**
   * Int8를 number[]로 변환합니다
   * @param data 변환할 Int8
   * @returns 변환된number[]
   */
  public static Int8ToBytes(data: number): number[] {
    return [data];
  }
  /**
   * Int16를 number[]로 변환합니다
   * @param data 변환할 Int16
   * @returns 변환된number[]
   */
  public static Int16ToBytes(data: number): number[] {
    return [data & 0xff, data >>> 8];
  }
  /**
   * Int32를 number[]로 변환합니다
   * @param data 변환할 Int32
   * @returns 변환된number[]
   */
  public static Int32ToBytes(data: number): number[] {
    return [
      (data << 24) >>> 24,
      (data << 16) >>> 24,
      (data << 8) >>> 24,
      data >>> 24
    ];
  }
  /**
   * Int64를 number[]로 변환합니다
   * @param data 변환할 Int64
   * @returns 변환된number[]
   */
  public static Int64ToBytes(data: number): number[] {
    var y = Math.floor(data / 0x100000000);
    return [
      (data << 24) >>> 24,
      (data << 16) >>> 24,
      (data << 8) >>> 24,
      data >>> 24,
      (y << 24) >>> 24,
      (y << 16) >>> 24,
      (y << 8) >>> 24,
      y >>> 24
    ];
  }

  /**
   * number[]를 Int8로 변환합니다
   * @param byteArr 변환할 number[]
   * @param offSet byteArr에서의 Offset 값 기본적으로 0이다
   * @returns 변환된 Int8
   */
  public static BytesToInt8(byteArr: number[], offSet: number = 0): number {
    return byteArr[offSet];
  }
  /**
   * number[]를 Int16으로 변환합니다
   * @param byteArr 변환할 number[]
   * @param offSet byteArr에서의 Offset 값 기본적으로 0이다
   * @returns 변환된 Int16
   */
  public static BytesToInt16(byteArr: number[], offSet: number = 0): number {
    return ((byteArr[offSet + 1] << 24) >> 16) | (byteArr[offSet] & 0xff);
  }
  /**
   * number[]를 Int32으로 변환합니다
   * @param byteArr 변환할 number[]
   * @param offSet byteArr에서의 Offset 값 기본적으로 0이다
   * @returns 변환된 Int32
   */
  public static BytesToInt32(byteArr: number[], offSet: number = 0): number {
    return (
      (byteArr[offSet + 3] << 24) |
      (byteArr[offSet + 2] << 16) |
      (byteArr[offSet + 1] << 8) |
      byteArr[offSet]
    );
  }
  /**
   * number[]를 Int64으로 변환합니다
   * @param byteArr 변환할 number[]
   * @param offSet byteArr에서의 Offset 값 기본적으로 0이다
   * @returns 변환된 Int64
   */
  public static BytesToInt64(byteArr: number[], offSet: number = 0): number {
    let l =
      (byteArr[offSet + 7] << 24) |
      (byteArr[offSet + 6] << 16) |
      (byteArr[offSet + 5] << 8) |
      byteArr[offSet + 4];
    let h =
      ((byteArr[offSet + 3] << 24) |
        (byteArr[offSet + 2] << 16) |
        (byteArr[offSet + 1] << 8) |
        byteArr[offSet]) >>>
      0;
    let tempData = l * 0x100000000 + h;

    if (
      Number.MIN_SAFE_INTEGER <= tempData &&
      tempData <= Number.MAX_SAFE_INTEGER
    )
      return tempData;
    throw "Number must be Number.isSafeInteger range";
  }

  /**
   * number[]를 UInt8으로 변환합니다
   * @param byteArr 변환할 number[]
   * @param offSet byteArr에서의 Offset 값 기본적으로 0이다
   * @returns 변환된 UInt8
   */
  public static BytesToUInt8(byteArr: number[], offSet: number = 0): number {
    return byteArr[offSet];
  }
  /**
   * number[]를 UInt16으로 변환합니다
   * @param byteArr 변환할 number[]
   * @param offSet byteArr에서의 Offset 값 기본적으로 0이다
   * @returns 변환된 UInt16
   */
  public static BytesToUInt16(byteArr: number[], offSet: number = 0): number {
    return (byteArr[offSet + 1] << 8) | byteArr[offSet];
  }
  /**
   * number[]를 UInt32으로 변환합니다
   * @param byteArr 변환할 number[]
   * @param offSet byteArr에서의 Offset 값 기본적으로 0이다
   * @returns 변환된 UInt32
   */
  public static BytesToUInt32(byteArr: number[], offSet: number = 0): number {
    return (
      ((byteArr[offSet + 3] << 24) |
        (byteArr[offSet + 2] << 16) |
        (byteArr[offSet + 1] << 8) |
        byteArr[offSet]) >>>
      0
    );
  }
  /**
   * number[]를 UInt64으로 변환합니다
   * @param byteArr 변환할 number[]
   * @param offSet byteArr에서의 Offset 값 기본적으로 0이다
   * @returns 변환된 UInt64
   */
  public static BytesToUInt64(byteArr: number[], offSet: number = 0): number {
    let l =
      ((byteArr[offSet + 7] << 24) |
        (byteArr[offSet + 6] << 16) |
        (byteArr[offSet + 5] << 8) |
        byteArr[offSet + 4]) >>>
      0;
    let h =
      ((byteArr[offSet + 3] << 24) |
        (byteArr[offSet + 2] << 16) |
        (byteArr[offSet + 1] << 8) |
        byteArr[offSet]) >>>
      0;
    let tempData = l * 0x100000000 + h;

    if (
      Number.MIN_SAFE_INTEGER <= tempData &&
      tempData <= Number.MAX_SAFE_INTEGER
    )
      return tempData;
    throw "Number must be Number.isSafeInteger range";
  }

  /**
   * 문자열을 number[]로 변환합니다
   * @param data 변환할 문자열
   * @param type 문자열 타입 - 기본적으로 utf-16 을 사용한다
   * @param isNullChar 끝에 Null문자를 추가하는 여부
   * @returns 변환된 number[]
   */
  public static StringToBytes(
    data: string,
    type: StringType | string = StringType.Utf16,
    isNullChar: boolean = false
  ): number[] {
    let dataArray: number[] = [];
    switch (type) {
      case StringType.Utf16: // TextEncoder 가 utf-16을 지원하지 않는다.
        let bytes = [];
        for (let i = 0; i < data.length; i++) {
          const code = data.charCodeAt(i); // x00-xFFFF
          bytes.push(code & 0xff, code >> 8); // low, high
        }
        if (isNullChar) {
          bytes.push(0);
          bytes.push(0);
        }
        dataArray = bytes;
        break;
      case StringType.Utf8:
        dataArray = Array.from(new TextEncoder().encode(data)); // 기본적으로 "utf-8" 기반으로 작동함
        if (isNullChar) {
          dataArray.push(0);
        }
        break;
    }
    return dataArray;
  }

  /**
   * number[]를 문자열로 변환합니다
   * @param data 변환할 number[]
   * @param type 문자열 타입 - 기본적으로 utf-16 을 사용한다
   * @returns 변환된 문자열
   */
  public static BytesToString(
    data: number[],
    type: StringType | string = StringType.Utf16
  ): string {
    switch (type) {
      case StringType.Utf16: // TextDecoder 가 utf-16을 지원하지 않는다.
        let stringTemp: string = "";
        for (let i = 0; i < data.length / 2; i++) {
          stringTemp += String.fromCharCode(
            data[i * 2] + (data[i * 2 + 1] << 8)
          );
        }
        return stringTemp;
      case StringType.Utf8:
        return new TextDecoder(type).decode(new Uint8Array(data)); // Node js 구현과 다르게 "utf-8" 만 작동함
    }
    throw console.error(`BytesToString is Not allowed Type : ${type}`);
  }

  /**
   * StringType을 이용하여 문자별 기본 바이트를 가져옵니다
   * @param type 문자열 타입
   * @returns 바이트 크기
   */
  public static CharSize(type: StringType): number {
    switch (type) {
      case StringType.Utf16:
        return 2;
      case StringType.Utf8:
        return 1;
    }
  }
}

export enum StringType {
  Utf16 = "utf-16",
  Utf8 = "utf-8"
}
