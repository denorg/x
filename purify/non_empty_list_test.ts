import { runTests } from "https://deno.land/std/testing/mod.ts";
import { it as test, expect } from "https://deno.land/x/expect/mod.ts";
import { Just, Nothing } from "./maybe.ts";
import { Tuple } from "./tuple.ts";
import { NonEmptyList } from "./non_empty_list.ts";

test("NonEmptyList", () => {
  expect(NonEmptyList([5])).toEqual([5]);
});

test("isNonEmpty", () => {
  expect(NonEmptyList.isNonEmpty([])).toEqual(false);
  expect(NonEmptyList.isNonEmpty([1])).toEqual(true);
});

test("fromArray", () => {
  expect(NonEmptyList.fromArray([])).toEqual(Nothing);
  expect(NonEmptyList.fromArray([1])).toEqual(Just(NonEmptyList([1])));
});

test("fromTuple", () => {
  expect(NonEmptyList.fromTuple(Tuple(1, "test"))).toEqual(
    NonEmptyList([1, "test"])
  );
});

test("head", () => {
  expect(NonEmptyList.head(NonEmptyList([1]))).toEqual(1);
});

test("last", () => {
  expect(NonEmptyList.last(NonEmptyList([1]))).toEqual(1);
});

test("unsafeCoerce", () => {
  expect(() => NonEmptyList.unsafeCoerce([])).toThrow();
  expect(NonEmptyList.unsafeCoerce([1])).toEqual(NonEmptyList([1]));
});

test("Should handle all Array.prototype methods", () => {
  expect(NonEmptyList([1]).map(_ => "always string")).toEqual(
    NonEmptyList(["always string"])
  );
  expect(NonEmptyList([1]).filter(_ => true)).toEqual(NonEmptyList([1]));
});

test("Should not lose type info when using Array.prototype methoids", () => {
  const a: NonEmptyList<string> = NonEmptyList([1]).map(_ => "");
  const b: NonEmptyList<number> = NonEmptyList([1]).reverse();
});

runTests({ exitOnFail: true });
