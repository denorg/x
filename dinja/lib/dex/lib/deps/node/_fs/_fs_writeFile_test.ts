// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
const { test } = Deno;

import {
  assert,
  assertEquals,
  assertNotEquals,
  assertThrows,
} from "../../testing/asserts.ts";
import { writeFile } from "./_fs_writeFile.ts";

const decoder = new TextDecoder("utf-8");

test("Invalid encoding results in error()", function fn() {
  assertThrows(
    () => {
      writeFile("some/path", "some data", "utf8");
    },
    TypeError,
    "Callback must be a function."
  );
});

test("Invalid encoding results in error()", function testEncodingErrors() {
  assertThrows(
    () => {
      writeFile("some/path", "some data", "made-up-encoding", () => {});
    },
    Error,
    `The value "made-up-encoding" is invalid for option "encoding"`
  );
  assertThrows(
    () => {
      writeFile(
        "some/path",
        "some data",
        {
          encoding: "made-up-encoding",
        },
        () => {}
      );
    },
    Error,
    `The value "made-up-encoding" is invalid for option "encoding"`
  );
});

test("Unsupported encoding results in error()", function testUnsupportedEncoding() {
  assertThrows(
    () => {
      writeFile("some/path", "some data", "hex", () => {});
    },
    Error,
    `Not implemented: "hex" encoding`
  );
  assertThrows(
    () => {
      writeFile(
        "some/path",
        "some data",
        {
          encoding: "base64",
        },
        () => {}
      );
    },
    Error,
    `Not implemented: "base64" encoding`
  );
});

test("Data is written to correct rid", async function testCorrectWriteUsingRid() {
  const tempFile: string = await Deno.makeTempFile();
  const file: Deno.File = await Deno.open(tempFile, {
    create: true,
    write: true,
    read: true,
  });

  await new Promise((resolve, reject) => {
    writeFile(file.rid, "hello world", (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
  Deno.close(file.rid);

  const data = await Deno.readFile(tempFile);
  await Deno.remove(tempFile);
  assertEquals(decoder.decode(data), "hello world");
});

test("Data is written to correct rid", async function testCorrectWriteUsingRid() {
  const tempFile: string = await Deno.makeTempFile();
  const file: Deno.File = await Deno.open(tempFile, {
    create: true,
    write: true,
    read: true,
  });

  await new Promise((resolve, reject) => {
    writeFile(file.rid, "hello world", (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
  Deno.close(file.rid);

  const data = await Deno.readFile(tempFile);
  await Deno.remove(tempFile);
  assertEquals(decoder.decode(data), "hello world");
});

test("Data is written to correct file", async function testCorrectWriteUsingPath() {
  const res = await new Promise((resolve) => {
    writeFile("_fs_writeFile_test_file.txt", "hello world", resolve);
  });

  const data = await Deno.readFile("_fs_writeFile_test_file.txt");
  await Deno.remove("_fs_writeFile_test_file.txt");
  assertEquals(res, null);
  assertEquals(decoder.decode(data), "hello world");
});

test("Mode is correctly set", async function testCorrectFileMode() {
  if (Deno.build.os === "windows") return;
  const filename = "_fs_writeFile_test_file.txt";

  const res = await new Promise((resolve) => {
    writeFile(filename, "hello world", { mode: 0o777 }, resolve);
  });

  const fileInfo = await Deno.stat(filename);
  await Deno.remove(filename);
  assertEquals(res, null);
  assert(fileInfo && fileInfo.mode);
  assertEquals(fileInfo.mode & 0o777, 0o777);
});

test("Mode is not set when rid is passed", async function testCorrectFileModeRid() {
  if (Deno.build.os === "windows") return;

  const filename: string = await Deno.makeTempFile();
  const file: Deno.File = await Deno.open(filename, {
    create: true,
    write: true,
    read: true,
  });

  await new Promise((resolve, reject) => {
    writeFile(file.rid, "hello world", { mode: 0o777 }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
  Deno.close(file.rid);

  const fileInfo = await Deno.stat(filename);
  await Deno.remove(filename);
  assert(fileInfo.mode);
  assertNotEquals(fileInfo.mode & 0o777, 0o777);
});
