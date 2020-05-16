import { assert } from "./deps.ts";
import { version } from "./../mod.ts";

Deno.test({
  name: "version.major() returns an unsigned integer",
  fn(): void {
    const major: number = version.major();

    assert(major >= 0);
    assert(major % 1 === 0);
  }
});

Deno.test({
  name: "version.minor() returns an unsigned integer",
  fn(): void {
    const minor: number = version.minor();

    assert(minor >= 0);
    assert(minor % 1 === 0);
  }
});

Deno.test({
  name: "version.string() returns a version string",
  fn(): void {
    const v: string = version.string();

    assert(/^\d+\.\d+(?:\.\d+)?$/.test(v));
  }
});
