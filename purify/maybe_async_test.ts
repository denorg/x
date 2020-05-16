import { runTests } from "https://deno.land/std/testing/mod.ts";
import { it as test, expect } from "https://deno.land/x/expect/mod.ts";
import { Just, Nothing } from "./maybe.ts";
import { MaybeAsyncHelpers, MaybeAsync } from "./maybe_async.ts";
import { Left, Right } from "./either.ts";

test("liftMaybe", () => {
  MaybeAsync(async ({ liftMaybe }: MaybeAsyncHelpers) => {
    const value: 5 = await liftMaybe(Just<5>(5));
    expect(value).toEqual(Just(5));
  });
});

test("fromPromise", () => {
  MaybeAsync(async ({ fromPromise }: MaybeAsyncHelpers) => {
    const value: 5 = await fromPromise(Promise.resolve(Just<5>(5)));
    expect(value).toEqual(Just(5));
  });
});

test("map", async () => {
  const newMaybeAsync = MaybeAsync(() => Promise.resolve(5)).map(() => "val");
  expect(await newMaybeAsync.run()).toEqual(Just("val"));
});

test("chain", async () => {
  const newMaybeAsync = MaybeAsync(() => Promise.resolve(5)).chain(() =>
    MaybeAsync(() => Promise.resolve("val"))
  );
  expect(await newMaybeAsync.run()).toEqual(Just("val"));
});

test("toEitherAsync", async () => {
  const ma = MaybeAsync(({ liftMaybe }: MaybeAsyncHelpers) =>
    liftMaybe(Nothing)
  );

  expect(await ma.toEitherAsync("Error").run()).toEqual(Left("Error"));

  const ma2 = MaybeAsync(({ liftMaybe }: MaybeAsyncHelpers) =>
    liftMaybe(Just(5))
  );

  expect(await ma2.toEitherAsync("Error").run()).toEqual(Right(5));
});

test("resolves to Nothing if any of the async Maybes are Nothing", async () => {
  expect(
    await MaybeAsync(({ liftMaybe }: MaybeAsyncHelpers) =>
      liftMaybe(Nothing)
    ).run()
  ).toEqual(Nothing);
});

test("resolves to Nothing if there is a rejected promise", async () => {
  expect(await MaybeAsync(() => Promise.reject()).run()).toEqual(Nothing);
});

test("resolves to Nothing if there is an exception thrown", async () => {
  expect(
    await MaybeAsync(() => {
      throw new Error("!");
    }).run()
  ).toEqual(Nothing);
});

test("resolve to Just if the promise resolves successfully", async () => {
  expect(
    await MaybeAsync(({ fromPromise }: MaybeAsyncHelpers) =>
      fromPromise(Promise.resolve(Just(5)))
    ).run()
  ).toEqual(Just(5));
});

async function main(): Promise<void> {
  await runTests({ exitOnFail: true });
}

main();
