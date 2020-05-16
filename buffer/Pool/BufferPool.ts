import ArrayPool from "./ArrayPool.ts";

export default class BufferPool {
  public poolArray: Array<ArrayPool<number>>;

  private static _bufferPool: BufferPool = new BufferPool();

  public constructor() {
    this.poolArray = new Array<ArrayPool<number>>(53);

    this.poolArray[0] = new ArrayPool<number>(128, undefined);
    this.poolArray[1] = new ArrayPool<number>(256, undefined);
    this.poolArray[2] = new ArrayPool<number>(384, undefined);
    this.poolArray[3] = new ArrayPool<number>(512, undefined);
    this.poolArray[4] = new ArrayPool<number>(640, undefined);
    this.poolArray[5] = new ArrayPool<number>(768, undefined);
    this.poolArray[6] = new ArrayPool<number>(896, undefined);
    this.poolArray[7] = new ArrayPool<number>(1024, undefined);
    this.poolArray[8] = new ArrayPool<number>(2048, undefined);
    this.poolArray[9] = new ArrayPool<number>(3072, undefined);
    this.poolArray[10] = new ArrayPool<number>(4096, undefined);
    this.poolArray[11] = new ArrayPool<number>(5120, undefined);
    this.poolArray[12] = new ArrayPool<number>(6144, undefined);
    this.poolArray[13] = new ArrayPool<number>(7168, undefined);
    this.poolArray[14] = new ArrayPool<number>(8192, undefined);
    this.poolArray[15] = new ArrayPool<number>(12288, undefined);
    this.poolArray[16] = new ArrayPool<number>(16384, undefined);
    this.poolArray[17] = new ArrayPool<number>(20480, undefined);
    this.poolArray[18] = new ArrayPool<number>(24576, undefined);
    this.poolArray[19] = new ArrayPool<number>(28672, undefined);
    this.poolArray[20] = new ArrayPool<number>(32768, undefined);
    this.poolArray[21] = new ArrayPool<number>(36864, undefined);
    this.poolArray[22] = new ArrayPool<number>(40960, undefined);
    this.poolArray[23] = new ArrayPool<number>(45056, undefined);
    this.poolArray[24] = new ArrayPool<number>(49152, undefined);
    this.poolArray[25] = new ArrayPool<number>(53248, undefined);
    this.poolArray[26] = new ArrayPool<number>(57344, undefined);
    this.poolArray[27] = new ArrayPool<number>(61440, undefined);
    this.poolArray[28] = new ArrayPool<number>(65536, undefined);
    this.poolArray[29] = new ArrayPool<number>(81920, undefined);
    this.poolArray[30] = new ArrayPool<number>(98304, undefined);
    this.poolArray[31] = new ArrayPool<number>(114688, undefined);
    this.poolArray[32] = new ArrayPool<number>(131072, undefined);
    this.poolArray[33] = new ArrayPool<number>(147456, undefined);
    this.poolArray[34] = new ArrayPool<number>(163840, undefined);
    this.poolArray[35] = new ArrayPool<number>(180224, undefined);
    this.poolArray[36] = new ArrayPool<number>(196608, undefined);
    this.poolArray[37] = new ArrayPool<number>(212992, undefined);
    this.poolArray[38] = new ArrayPool<number>(229376, undefined);
    this.poolArray[39] = new ArrayPool<number>(245760, undefined);
    this.poolArray[40] = new ArrayPool<number>(262144, undefined);
    this.poolArray[41] = new ArrayPool<number>(327680, undefined);
    this.poolArray[42] = new ArrayPool<number>(393216, undefined);
    this.poolArray[43] = new ArrayPool<number>(458752, undefined);
    this.poolArray[44] = new ArrayPool<number>(524288, undefined);
    this.poolArray[45] = new ArrayPool<number>(589824, undefined);
    this.poolArray[46] = new ArrayPool<number>(655360, undefined);
    this.poolArray[47] = new ArrayPool<number>(720896, undefined);
    this.poolArray[48] = new ArrayPool<number>(786432, undefined);
    this.poolArray[49] = new ArrayPool<number>(851968, undefined);
    this.poolArray[50] = new ArrayPool<number>(917504, undefined);
    this.poolArray[51] = new ArrayPool<number>(983040, undefined);
    this.poolArray[52] = new ArrayPool<number>(1048576, undefined);
  }

  public static SelectPool(size: number): number {
    if (size <= 8192) {
      if (size <= 1024) {
        return (size - 1) >> 7;
      }
      return ((size - 1) >> 10) + 7;
    }

    if (size <= 65536) {
      return ((size - 1) >> 12) + 13;
    }
    if (size <= 262144) {
      return ((size - 1) >> 14) + 25;
    }
    return ((size - 1) >> 16) + 37;
  }

  public static TakeBuffer(size: number): number[] {
    return BufferPool._bufferPool.GetObject(BufferPool.SelectPool(size));
  }

  public static ReturnBuffer(item: number[]) {
    BufferPool._bufferPool.PutObject(BufferPool.SelectPool(item.length), item);
  }

  private GetObject(bufferPos: number): number[] {
    return BufferPool._bufferPool.poolArray[bufferPos].GetObject();
  }

  private PutObject(bufferPos: number, item: number[]): void {
    BufferPool._bufferPool.poolArray[bufferPos].PutObject(item);
  }
}
