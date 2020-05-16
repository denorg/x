import {
  DeepFunc,
  traverseFileSystem,
} from "https://deno.land/x/tree@0.2.0/async.ts";
import {
  join,
} from "./deps.ts";

const TEST_FILE_REGEX = /\.test\.(ts|js)$/i;
const isTestFile = (filename: string) => TEST_FILE_REGEX.test(filename);

const DEEP_IGNORE = [".git", "node_modules"];
const deep: DeepFunc = (param) => !DEEP_IGNORE.includes(param.info.name!);

export async function getDefaultList() {
  const testFiles: string[] = [];
  for await (const item of traverseFileSystem(".", deep)) {
    const filename = join(item.container, item.info.name);
    if (!isTestFile(filename)) continue;
    testFiles.push(filename);
  }
  return testFiles;
}

export default getDefaultList;
