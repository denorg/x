import {
  assertEquals,
} from "https://deno.land/std@v0.50.0/testing/asserts.ts";
import { parse } from "./cross-env.ts";

const { test, run, execPath, readAll } = Deno;

test({
  name: "testParse",
  fn: async () => {
    {
      const { env, command } = parse(["deno", "run", "example.ts"]);

      assertEquals(env, {});
      assertEquals(command, ["deno", "run", "example.ts"]);
    }

    {
      const { env, command } = parse(["FOO=bar", "deno", "run", "example.ts"]);

      assertEquals(env, { FOO: "bar" });
      assertEquals(command, ["deno", "run", "example.ts"]);
    }

    {
      const { env, command } = parse(["FOO=", "deno", "run", "example.ts"]);

      assertEquals(env, { FOO: "" });
      assertEquals(command, ["deno", "run", "example.ts"]);
    }

    {
      const { env, command } = parse([
        "FOO=bar",
        "NAME=deno",
        "deno",
        "run",
        "example.ts",
      ]);

      assertEquals(env, { FOO: "bar", NAME: "deno" });
      assertEquals(command, ["deno", "run", "example.ts"]);
    }
  },
});

test({
  name: "run with env",
  fn: async () => {
    const ps = run({
      cmd: [
        execPath(),
        "run",
        "--allow-run",
        "--allow-env",
        "./cross-env.ts",
        "FOO=BAR",
        execPath(),
        "run",
        "--allow-env",
        "./__test__/basic.ts",
      ],
      stdout: "piped",
    });

    const output = await readAll(ps.stdout!);

    ps.stdout?.close();
    ps.close();

    assertEquals(new TextDecoder().decode(output), "BAR");
  },
});

test({
  name: "run with multiple env",
  fn: async () => {
    const ps = run({
      cmd: [
        execPath(),
        "run",
        "--allow-run",
        "--allow-env",
        "./cross-env.ts",
        "FOO=123",
        "BAR=321",
        execPath(),
        "run",
        "--allow-env",
        "./__test__/multiple.ts",
      ],
      stdout: "piped",
    });

    const output = await readAll(ps.stdout!);

    ps.stdout?.close();
    ps.close();

    assertEquals(new TextDecoder().decode(output), "123321");
  },
});

test({
  name: "run with --version",
  fn: async () => {
    const ps = run({
      cmd: [
        execPath(),
        "run",
        "--allow-run",
        "--allow-env",
        "./cross-env.ts",
        "--version",
      ],
      stdout: "piped",
    });

    const output = await readAll(ps.stdout!);

    ps.stdout?.close();
    ps.close();

    assertEquals(new TextDecoder().decode(output), "v0.4.0\n");
  },
});
