import { fail, assertEquals } from "https://deno.land/std@0.50.0/testing/asserts.ts";
import { join, dirname } from "https://deno.land/std@0.50.0/path/mod.ts";
import { isExecutable } from "./main.ts";

let currentDir = dirname(new URL(import.meta.url).pathname);

Deno.test({
  name: "async: executable file is executable",
  async fn(): Promise<void> {
    const filePath = join(currentDir, './fixtures/script.sh')
    const isExec = await isExecutable(filePath);

    assertEquals(isExec, true);
  },
});

Deno.test({
  name: "async: non-executable file is not executable",
  async fn(): Promise<void> {
    const filePath = join(currentDir, '../readme.md')
    const isExec = await isExecutable(filePath);

    assertEquals(isExec, false);
  },
});

Deno.test({
  name: "async: folder is not executable",
  async fn(): Promise<void> {
    const isExec = await isExecutable(".");

    assertEquals(isExec, false);
  },
});

Deno.test({
  name: "async: non-existant file throws",
  async fn(): Promise<void> {
    try {
      await isExecutable("./non-existant");
      fail();
    } catch {}
  },
});

Deno.test({
  name: "async: non-existant file doesn't throw on `ignoreErrors` option",
  async fn(): Promise<void> {
    try {
      await isExecutable("./non-existant", {
        ignoreErrors: true,
      });
    } catch {
      fail();
    }
  },
});

// TODO
Deno.test({
  name: "async: file owned by different user not executable",
  async fn(): Promise<void> {
    try {
      const filePath = join(currentDir, './fixtures/otherUser.sh')
      await isExecutable(filePath);
    } catch {}
  },
});
