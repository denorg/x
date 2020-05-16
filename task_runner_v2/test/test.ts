const { readFile } = Deno;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { TaskRunner } from "../runner.ts";

Deno.test(async function basics() {
  const bytes = await readFile("tmp/result-from-shell");
  const result = new TextDecoder()
    .decode(bytes)
    .replace(/\r\n/g, "\n")
    .trim();
  const expectation =
    `hello world
    ====
    hello alice
    hello bob
    ====
    start
    foo
    bar
    foo
    bar
    foo
    end
    ====`
    .replace(/\r\n/g, "\n")
    .trim();
  assertEquals(result, expectation);
});

Deno.test(async function shell() {
  const bytes = await readFile("tmp/result-from-shell");
  const result = new TextDecoder()
    .decode(bytes)
    .replace(/\r\n/g, "\n")
    .replace(/\s*\n/g, "\n") // for cmd.exe
    .trim();
  const expectation =
    `hello
world`
    .replace(/\r\n/g, "\n")
    .trim();
  assertEquals(result, expectation);
});

Deno.test(async function errors() {
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("foo");
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("a b", "echo hello");
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("hello", "echo hello");
    runner.task("hello", "echo hello again");
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("hello", "echo hello");
    await runner.run("hell");
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("hello", "$echo hello");
    await runner.run("hello");
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("hello", "$hello");
    await runner.run("hello");
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("greeting", "echo hello", "echo bye");
    await runner.run("greeting", ["x"]);
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("greeting", ["echo hello", "echo bye"]);
    await runner.run("greeting", ["x"]);
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task("child", ["echo hello"]).watch(".");
    runner.task("parent", ["$child"]).watch(".");
    await runner.run("parent", []);
  });
  await throws(async () => {
    const runner = new TaskRunner();
    runner.task(
      "failure",
      "echo start",
      ["deno test/failure.ts", "echo another"],
      "echo end"
    );
    await runner.run("failure");
  });
});

export async function throws(
  f: () => Promise<void> | void,
  message?: string
): Promise<void> {
  let thrown = false;
  try {
    await f();
  } catch (e) {
    console.log(e.message);
    thrown = true;
  }
  if (!thrown) {
    throw new Error(
      message || `Expected \`${funcToString(f)}\` to throw, but it did not.`
    );
  }
}
function funcToString(f: Function) {
  // index_ts_1.funcname()
  return f
    .toString()
    .replace(/[a-zA-Z0-9]+_(ts|js)_[0-9]+\./g, "")
    .replace(/\s+/g, " ");
}
