import { runTests } from "https://deno.land/std/testing/mod.ts";
import { it as test, expect } from "https://deno.land/x/expect/mod.ts";
import { EitherAsyncHelpers, EitherAsync } from "./either_async.ts";
import { Left, Right, Either } from "./either.ts";
import { Nothing, Just } from "./maybe.ts";

test("liftEither", () => {
  EitherAsync(async ({ liftEither }: EitherAsyncHelpers<void>) => {
    const value: 5 = await liftEither(Right<5>(5));
  });
});

test("fromPromise", () => {
  EitherAsync(async ({ fromPromise }: EitherAsyncHelpers<void>) => {
    const value: 5 = await fromPromise(Promise.resolve(Right<5>(5)));
  });
});

test("throwE", async () => {
  const ea = EitherAsync<string, number>(
    async ({ liftEither, throwE }: EitherAsyncHelpers<string>) => {
      const value: 5 = await liftEither(Right<5>(5));
      throwE("Test");
      return value;
    }
  );

  expect(await ea.run()).toEqual(Left("Test"));
});

test("map", async () => {
  const newEitherAsync = EitherAsync(() => Promise.resolve(5)).map(_ => "val");
  expect(await newEitherAsync.run()).toEqual(Right("val"));
});

test("chain", async () => {
  const newEitherAsync = EitherAsync(() => Promise.resolve(5)).chain(_ =>
    EitherAsync(() => Promise.resolve("val"))
  );
  expect(await newEitherAsync.run()).toEqual(Right("val"));
});

test("toMaybeAsync", async () => {
  const ma = EitherAsync(({ liftEither }: EitherAsyncHelpers<string>) =>
    liftEither(Left("123"))
  );

  expect(await ma.toMaybeAsync().run()).toEqual(Nothing);

  const ma2 = EitherAsync(({ liftEither }: EitherAsyncHelpers<void>) =>
    liftEither(Right(5))
  );

  expect(await ma2.toMaybeAsync().run()).toEqual(Just(5));
});

test("resolves to Left if any of the async Eithers are Left", async () => {
  expect(
    await EitherAsync(({ fromPromise }: EitherAsyncHelpers<string>) =>
      fromPromise(Promise.resolve(Left("Error")))
    ).run()
  ).toEqual(Left("Error"));
});

test("resolves to a Left with the rejected value if there is a rejected promise", async () => {
  expect(
    await EitherAsync<void, never>(
      ({ fromPromise }: EitherAsyncHelpers<void>) =>
        fromPromise(Promise.reject("Some error"))
    ).run()
  ).toEqual(Left("Some error"));
});

test("resolves to Left with an exception if there is an exception thrown", async () => {
  expect(
    await EitherAsync(() => {
      throw new Error("!");
    }).run()
  ).toEqual(Left(Error("!")));
});

test("resolve to Right if the promise resolves successfully", async () => {
  expect(
    await EitherAsync(({ fromPromise }: EitherAsyncHelpers<void>) =>
      fromPromise(Promise.resolve(Right(5)))
    ).run()
  ).toEqual(Right(5));
});

async function main(): Promise<void> {
  await runTests({ exitOnFail: true });
}

main();
