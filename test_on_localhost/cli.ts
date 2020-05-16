#! /usr/bin/env -S deno -A
import args from "https://deno.land/x/args@1.0.2/wrapper.ts";
import {
  EarlyExitFlag,
  BinaryFlag,
  PartialOption,
} from "https://deno.land/x/args@1.0.2/flag-types.ts";
import {
  Text,
  Integer,
} from "https://deno.land/x/args@1.0.2/value-types.ts";
import {
  MAIN_COMMAND,
} from "https://deno.land/x/args@1.0.2/symbols.ts";
import run from "./run.ts";

const parser = args
  .describe("Run deno test files on localhost")
  .with(EarlyExitFlag("help", {
    alias: ["?"],
    describe: "Show help",
    exit() {
      console.log("USAGE:");
      console.log("  deno -A cli.ts [options] ...files");
      console.log(parser.help());
      return Deno.exit(0);
    },
  }))
  .with(PartialOption("dir", {
    alias: ["d"],
    describe: "Target directory",
    type: Text,
    default: ".",
  }))
  .with(PartialOption("port", {
    alias: ["p"],
    describe: "Port to use",
    type: Integer,
    default: 4321n,
  }))
  .with(PartialOption("hostname", {
    alias: ["h"],
    describe: "Hostname to use",
    type: Text,
    default: "0.0.0.0",
  }))
  .with(BinaryFlag("cors", {
    describe: "Enable Cross-Origin Resource Sharing",
  }))
  .with(PartialOption("deno", {
    describe: "Deno command",
    type: Text,
    default: "deno",
  }));

const parserRes = parser.parse(Deno.args);
if (parserRes.tag !== MAIN_COMMAND) {
  console.error(parserRes.error.toString());
  throw Deno.exit(1);
}
if (parserRes.remaining().rawFlags().length) {
  console.error("Unknown flags:", ...parserRes.remaining().rawFlags());
  throw Deno.exit(1);
}

const {
  dir,
  hostname,
  port,
  cors,
  deno,
} = parserRes.value;

const testFiles = parserRes.remaining().rawValues();

Deno.chdir(dir);
const { code, signal } = await run({
  list: testFiles.length ? testFiles : undefined,
  hostname,
  port: Number(port),
  deno,
  cors,
});
if (signal) console.error("SIGNAL", signal);
throw Deno.exit(code);
