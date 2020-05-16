// Based on https://github.com/golang/go/blob/891682/src/bufio/bufio_test.go
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { Buffer } = Deno;
type Reader = Deno.Reader;
import { test, runIfMain } from "../testing/mod.ts";
import {
  assert,
  assertEquals,
  assertNotEquals,
  fail
} from "../testing/asserts.ts";
import {
  BufReader,
  BufWriter,
  BufferFullError,
  UnexpectedEOFError
} from "./bufio.ts";
import * as iotest from "./iotest.ts";
import { charCode, copyBytes, stringsReader } from "./util.ts";

const encoder = new TextEncoder();

function assertNotEOF<T extends {}>(val: T | Deno.EOF): T {
  assertNotEquals(val, Deno.EOF);
  return val as T;
}

async function readBytes(buf: BufReader): Promise<string> {
  const b = new Uint8Array(1000);
  let nb = 0;
  while (true) {
    const c = await buf.readByte();
    if (c === Deno.EOF) {
      break; // EOF
    }
    b[nb] = c;
    nb++;
  }
  const decoder = new TextDecoder();
  return decoder.decode(b.subarray(0, nb));
}

test(async function bufioReaderSimple(): Promise<void> {
  const data = "hello world";
  const b = new BufReader(stringsReader(data));
  const s = await readBytes(b);
  assertEquals(s, data);
});

interface ReadMaker {
  name: string;
  fn: (r: Reader) => Reader;
}

const readMakers: ReadMaker[] = [
  { name: "full", fn: (r): Reader => r },
  {
    name: "byte",
    fn: (r): iotest.OneByteReader => new iotest.OneByteReader(r)
  },
  { name: "half", fn: (r): iotest.HalfReader => new iotest.HalfReader(r) }
  // TODO { name: "data+err", r => new iotest.DataErrReader(r) },
  // { name: "timeout", fn: r => new iotest.TimeoutReader(r) },
];

// Call read to accumulate the text of a file
async function reads(buf: BufReader, m: number): Promise<string> {
  const b = new Uint8Array(1000);
  let nb = 0;
  while (true) {
    const result = await buf.read(b.subarray(nb, nb + m));
    if (result === Deno.EOF) {
      break;
    }
    nb += result;
  }
  const decoder = new TextDecoder();
  return decoder.decode(b.subarray(0, nb));
}

interface NamedBufReader {
  name: string;
  fn: (r: BufReader) => Promise<string>;
}

const bufreaders: NamedBufReader[] = [
  { name: "1", fn: (b: BufReader): Promise<string> => reads(b, 1) },
  { name: "2", fn: (b: BufReader): Promise<string> => reads(b, 2) },
  { name: "3", fn: (b: BufReader): Promise<string> => reads(b, 3) },
  { name: "4", fn: (b: BufReader): Promise<string> => reads(b, 4) },
  { name: "5", fn: (b: BufReader): Promise<string> => reads(b, 5) },
  { name: "7", fn: (b: BufReader): Promise<string> => reads(b, 7) },
  { name: "bytes", fn: readBytes }
  // { name: "lines", fn: readLines },
];

const MIN_READ_BUFFER_SIZE = 16;
const bufsizes: number[] = [
  0,
  MIN_READ_BUFFER_SIZE,
  23,
  32,
  46,
  64,
  93,
  128,
  1024,
  4096
];

test(async function bufioBufReader(): Promise<void> {
  const texts = new Array<string>(31);
  let str = "";
  let all = "";
  for (let i = 0; i < texts.length - 1; i++) {
    texts[i] = str + "\n";
    all += texts[i];
    str += String.fromCharCode((i % 26) + 97);
  }
  texts[texts.length - 1] = all;

  for (const text of texts) {
    for (const readmaker of readMakers) {
      for (const bufreader of bufreaders) {
        for (const bufsize of bufsizes) {
          const read = readmaker.fn(stringsReader(text));
          const buf = new BufReader(read, bufsize);
          const s = await bufreader.fn(buf);
          const debugStr =
            `reader=${readmaker.name} ` +
            `fn=${bufreader.name} bufsize=${bufsize} want=${text} got=${s}`;
          assertEquals(s, text, debugStr);
        }
      }
    }
  }
});

test(async function bufioBufferFull(): Promise<void> {
  const longString =
    "And now, hello, world! It is the time for all good men to come to the" +
    " aid of their party";
  const buf = new BufReader(stringsReader(longString), MIN_READ_BUFFER_SIZE);
  const decoder = new TextDecoder();

  try {
    await buf.readSlice(charCode("!"));
    fail("readSlice should throw");
  } catch (err) {
    assert(err instanceof BufferFullError);
    assert(err.partial instanceof Uint8Array);
    assertEquals(decoder.decode(err.partial), "And now, hello, ");
  }

  const line = assertNotEOF(await buf.readSlice(charCode("!")));
  const actual = decoder.decode(line);
  assertEquals(actual, "world!");
});

test(async function bufioReadString(): Promise<void> {
  const string = "And now, hello, world!";
  const buf = new BufReader(stringsReader(string), MIN_READ_BUFFER_SIZE);

  const line = assertNotEOF(await buf.readString(","));
  assertEquals(line, "And now,");
  assertEquals(line.length, 8);

  try {
    await buf.readString("deno");

    fail("should throw");
  } catch (err) {
    assert(err.message, "Delimiter should be a single character");
  }
});

const testInput = encoder.encode(
  "012\n345\n678\n9ab\ncde\nfgh\nijk\nlmn\nopq\nrst\nuvw\nxy"
);
const testInputrn = encoder.encode(
  "012\r\n345\r\n678\r\n9ab\r\ncde\r\nfgh\r\nijk\r\nlmn\r\nopq\r\nrst\r\n" +
    "uvw\r\nxy\r\n\n\r\n"
);
const testOutput = encoder.encode("0123456789abcdefghijklmnopqrstuvwxy");

// TestReader wraps a Uint8Array and returns reads of a specific length.
class TestReader implements Reader {
  constructor(private data: Uint8Array, private stride: number) {}

  async read(buf: Uint8Array): Promise<number | Deno.EOF> {
    let nread = this.stride;
    if (nread > this.data.byteLength) {
      nread = this.data.byteLength;
    }
    if (nread > buf.byteLength) {
      nread = buf.byteLength;
    }
    if (nread === 0) {
      return Deno.EOF;
    }
    copyBytes(buf as Uint8Array, this.data);
    this.data = this.data.subarray(nread);
    return nread;
  }
}

async function testReadLine(input: Uint8Array): Promise<void> {
  for (let stride = 1; stride < 2; stride++) {
    let done = 0;
    const reader = new TestReader(input, stride);
    const l = new BufReader(reader, input.byteLength + 1);
    while (true) {
      const r = await l.readLine();
      if (r === Deno.EOF) {
        break;
      }
      const { line, more } = r;
      assertEquals(more, false);
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      const want = testOutput.subarray(done, done + line.byteLength);
      assertEquals(
        line,
        want,
        `Bad line at stride ${stride}: want: ${want} got: ${line}`
      );
      done += line.byteLength;
    }
    assertEquals(
      done,
      testOutput.byteLength,
      `readLine didn't return everything: got: ${done}, ` +
        `want: ${testOutput} (stride: ${stride})`
    );
  }
}

test(async function bufioReadLine(): Promise<void> {
  await testReadLine(testInput);
  await testReadLine(testInputrn);
});

test(async function bufioPeek(): Promise<void> {
  const decoder = new TextDecoder();
  const p = new Uint8Array(10);
  // string is 16 (minReadBufferSize) long.
  const buf = new BufReader(
    stringsReader("abcdefghijklmnop"),
    MIN_READ_BUFFER_SIZE
  );

  let actual = assertNotEOF(await buf.peek(1));
  assertEquals(decoder.decode(actual), "a");

  actual = assertNotEOF(await buf.peek(4));
  assertEquals(decoder.decode(actual), "abcd");

  try {
    await buf.peek(32);
    fail("peek() should throw");
  } catch (err) {
    assert(err instanceof BufferFullError);
    assert(err.partial instanceof Uint8Array);
    assertEquals(decoder.decode(err.partial), "abcdefghijklmnop");
  }

  await buf.read(p.subarray(0, 3));
  assertEquals(decoder.decode(p.subarray(0, 3)), "abc");

  actual = assertNotEOF(await buf.peek(1));
  assertEquals(decoder.decode(actual), "d");

  actual = assertNotEOF(await buf.peek(1));
  assertEquals(decoder.decode(actual), "d");

  actual = assertNotEOF(await buf.peek(1));
  assertEquals(decoder.decode(actual), "d");

  actual = assertNotEOF(await buf.peek(2));
  assertEquals(decoder.decode(actual), "de");

  const res = await buf.read(p.subarray(0, 3));
  assertEquals(decoder.decode(p.subarray(0, 3)), "def");
  assert(res !== Deno.EOF);

  actual = assertNotEOF(await buf.peek(4));
  assertEquals(decoder.decode(actual), "ghij");

  await buf.read(p);
  assertEquals(decoder.decode(p), "ghijklmnop");

  actual = assertNotEOF(await buf.peek(0));
  assertEquals(decoder.decode(actual), "");

  const r = await buf.peek(1);
  assert(r === Deno.EOF);
  /* TODO
	Test for issue 3022, not exposing a reader's error on a successful Peek.
	buf = NewReaderSize(dataAndEOFReader("abcd"), 32)
	if s, err := buf.Peek(2); string(s) != "ab" || err != nil {
		t.Errorf(`Peek(2) on "abcd", EOF = %q, %v; want "ab", nil`, string(s), err)
	}
	if s, err := buf.Peek(4); string(s) != "abcd" || err != nil {
		t.Errorf(
      `Peek(4) on "abcd", EOF = %q, %v; want "abcd", nil`,
      string(s),
      err
    )
	}
	if n, err := buf.Read(p[0:5]); string(p[0:n]) != "abcd" || err != nil {
		t.Fatalf("Read after peek = %q, %v; want abcd, EOF", p[0:n], err)
	}
	if n, err := buf.Read(p[0:1]); string(p[0:n]) != "" || err != io.EOF {
		t.Fatalf(`second Read after peek = %q, %v; want "", EOF`, p[0:n], err)
	}
  */
});

test(async function bufioWriter(): Promise<void> {
  const data = new Uint8Array(8192);

  for (let i = 0; i < data.byteLength; i++) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    data[i] = charCode(" ") + (i % (charCode("~") - charCode(" ")));
  }

  const w = new Buffer();
  for (const nwrite of bufsizes) {
    for (const bs of bufsizes) {
      // Write nwrite bytes using buffer size bs.
      // Check that the right amount makes it out
      // and that the data is correct.

      w.reset();
      const buf = new BufWriter(w, bs);

      const context = `nwrite=${nwrite} bufsize=${bs}`;
      const n = await buf.write(data.subarray(0, nwrite));
      assertEquals(n, nwrite, context);

      await buf.flush();

      const written = w.bytes();
      assertEquals(written.byteLength, nwrite);

      for (let l = 0; l < written.byteLength; l++) {
        assertEquals(written[l], data[l]);
      }
    }
  }
});

test(async function bufReaderReadFull(): Promise<void> {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const text = "Hello World";
  const data = new Buffer(enc.encode(text));
  const bufr = new BufReader(data, 3);
  {
    const buf = new Uint8Array(6);
    const r = assertNotEOF(await bufr.readFull(buf));
    assertEquals(r, buf);
    assertEquals(dec.decode(buf), "Hello ");
  }
  {
    const buf = new Uint8Array(6);
    try {
      await bufr.readFull(buf);
      fail("readFull() should throw");
    } catch (err) {
      assert(err instanceof UnexpectedEOFError);
      assert(err.partial instanceof Uint8Array);
      assertEquals(err.partial.length, 5);
      assertEquals(dec.decode(buf.subarray(0, 5)), "World");
    }
  }
});

runIfMain(import.meta);
