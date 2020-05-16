import { runTests, test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
// Note: Travis CI seems to runs on a little endian host.
// I'm not sure if there's a better way to test, Pull requests are welcome.

import Endianess from 'https://raw.github.com/denolibs/endianness/master/mod.ts';

test({
  name: 'Endianess.big',
  fn(): void {
    assertEquals(Endianess.big, false);
  },
});

test({
  name: 'Endianess.little',
  fn(): void {
    assertEquals(Endianess.little, true);
  },
});

test({
  name: 'endian.isBigEndian()',
  fn(): void {
    const endian = new Endianess();
    assertEquals(endian.isBigEndian(), false);
  },
});

test({
  name: 'endian.isLittleEndian()',
  fn(): void {
    const endian = new Endianess();
    assertEquals(endian.isLittleEndian(), true);
  },
});

test({
  name: 'endian.toString()',
  fn(): void {
    const endian = new Endianess();
    assertEquals(endian.toString(), 'little');
  },
});

runTests();
