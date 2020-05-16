import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { readline } from "./mod.ts";

async function testFileReader(): Promise<Deno.Reader> {
  const buf = new Deno.Buffer();
  const enc = new TextEncoder();

  await buf.write(enc.encode("1\n2"));
  await buf.write(enc.encode("\n3"));
  await buf.write(enc.encode("\n4\n5\n6"));

  return buf;
}

Deno.test({
  name: "read lines from reader",
  async fn() {
    const lines = [];
    for await (const line of readline(await testFileReader())) {
      lines.push(line);
    }

    assertEquals(lines, [
      new Uint8Array([49]),
      new Uint8Array([50]),
      new Uint8Array([51]),
      new Uint8Array([52]),
      new Uint8Array([53]),
      new Uint8Array([54]),
    ]);
  },
});

Deno.test({
  name: "read lines from reader with custom separator",
  async fn() {
    const lines = [];
    for await (const line of readline(await testFileReader(), {
      separator: new Uint8Array([10, 51, 10]),
    })) {
      lines.push(line);
    }

    assertEquals(lines, [
      new Uint8Array([49, 10, 50]),
      new Uint8Array([52, 10, 53, 10, 54]),
    ]);
  },
});

Deno.test({
  name: "read lines from reader where separator is the first character",
  async fn() {
    const lines = [];
    for await (const line of readline(await testFileReader(), {
      separator: new Uint8Array([49]),
    })) {
      lines.push(line);
    }

    assertEquals(lines, [
      new Uint8Array([]),
      new Uint8Array([10, 50, 10, 51, 10, 52, 10, 53, 10, 54]),
    ]);
  },
});

Deno.test({
  name: "read lines from reader where separator is the last character",
  async fn() {
    const lines = [];
    for await (const line of readline(await testFileReader(), {
      separator: new Uint8Array([54]),
    })) {
      lines.push(line);
    }

    assertEquals(lines, [
      new Uint8Array([49, 10, 50, 10, 51, 10, 52, 10, 53, 10]),
      new Uint8Array([]),
    ]);
  },
});
