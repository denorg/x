// Copyright (c) 2019 Denolibs authors. All rights reserved. MIT license.

export default class Endianness {
  private readonly littleEndian: boolean;

  /** Creates a new Endianess object */
  public constructor() {
    this.littleEndian = this._littleEndian();
  }

  /** Checks endianess of the host */
  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView#Endianness
  private _littleEndian(): boolean {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
    // Int16Array uses the platform's endianness.
    return new Int16Array(buffer)[0] === 256;
  }

  /** Static boolean to determine if host is big endian */
  public static big = new Endianness().isBigEndian();

  /** Returns true if the host is big endian */
  public isBigEndian(): boolean {
    return !this.littleEndian;
  }

  /** Returns true if the host is little endian */
  public isLittleEndian(): boolean {
    return this.littleEndian;
  }

  /** Static boolean to determine if host is little endian */
  public static little = new Endianness().isLittleEndian();

  /** Converts the endianess to a string */
  public toString(): string {
    return this.littleEndian ? 'little' : 'big';
  }
}
