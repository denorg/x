import { runTests, test } from "https://deno.land/std/testing/mod.ts";
import { expect, it, mock } from "https://deno.land/x/expect@v0.2.0/mod.ts";
import { DataBatcher } from "./databatcher.ts";

it("can be created", () => {
  const loader = async keys => keys;

  const batcher = new DataBatcher(loader);
  expect(batcher).toBeInstanceOf(DataBatcher);
});

it("uses batchLoad to load", async () => {
  const loader = mock.fn(async keys => keys);
  const batcher = new DataBatcher(loader);
  await batcher.load(1);
  expect(loader).toHaveBeenCalledWith([1]);
});

it("uses batchLoader to loadMany", async () => {
  const loader = mock.fn(async keys => keys);
  const batcher = new DataBatcher(loader);
  await batcher.loadMany([1, 2]);
  expect(loader).toHaveBeenCalledWith([1, 2]);
});

it('supports loading using any kind of key', async () => {
  const loader = mock.fn(async keys => keys);
  const batcher = new DataBatcher(loader);

  const obj = {}

  const loadA = batcher.load(obj);
  const loadB = batcher.load(obj);
  expect(loadA).toBe(loadB);
  const loaded = await loadA
  expect(loaded).toBe(obj)
})

it("is lazy with loads in same batch", async () => {
  const loader = mock.fn(async keys => keys);
  const batcher = new DataBatcher(loader);
  const loadA = batcher.load(1);
  const loadB = batcher.load(1);
  expect(loadA).toBe(loadB);
  await Promise.all([loadA, loadB]);
  expect(loader).toHaveBeenCalledWith([1]);
});

it("supports disabling cache through options", async () => {
  const loader = mock.fn(async keys => keys);
  const batcher = new DataBatcher(loader, { cache: false });
  const loadA = batcher.load(1);
  const loadB = batcher.load(1);
  expect(loadA).not.toBe(loadB);
  await Promise.all([loadA, loadB]);
  expect(loader).toHaveBeenCalledWith([1, 1]);
});

it("supports limiting batch size through options", async () => {
  const loader = mock.fn(async keys => keys);
  const batcher = new DataBatcher(loader, { maxBatchSize: 1 });
  await Promise.all([batcher.load(1), batcher.load(2)]);
  expect(loader).toHaveBeenCalledTimes(2);
  expect(loader).toHaveBeenNthCalledWith(1, [1]);
  expect(loader).toHaveBeenNthCalledWith(2, [2]);
});

it("supports custom cache key function", async () => {
  const loader = mock.fn(async keys => keys);
  const batcher = new DataBatcher(loader, { cacheKeyFn: () => 1 });
  const loadA = batcher.load(1);
  const loadB = batcher.load(2);
  expect(loadA).toBe(loadB); // cacheKeyFn causes collisions
});

it("uses cache key function to delete items from cache", async () => {
  const loader = mock.fn(async keys => keys);
  const saver = mock.fn(async writes => writes.map(() => true));
  const batcher = new DataBatcher(loader, saver, { cacheKeyFn: k => k * 10 });
  const loadA = batcher.load(1);
  batcher.save(1, "TEST");
  const loadB = batcher.load(1);
  expect(loadA).not.toBe(loadB);
});

it("uses batchSaver to save", async () => {
  const loader = mock.fn(async keys => keys);
  const saver = mock.fn(async writes => writes.map(() => undefined));

  const batcher = new DataBatcher(loader, saver);
  await batcher.save(1, "test");
  expect(saver).toHaveBeenCalledWith([[1, "test"]]);
});

it("uses batchSaver to saveMany", async () => {
  const loader = mock.fn(async keys => keys);
  const saver = mock.fn(async writes => writes.map(() => undefined));

  const batcher = new DataBatcher(loader, saver);
  await batcher.saveMany([[1, 1], [2, 2]]);
  expect(saver).toHaveBeenCalledWith([[1, 1], [2, 2]]);
});

it("clears load cache when save changes", async () => {
  let loadCount = 0;
  const loader = mock.fn(async keys => {
    loadCount++;
    return keys.map(key => `${loadCount}-${key}`);
  });
  const saver = mock.fn(async writes => writes.map(() => undefined));
  const batcher = new DataBatcher(loader, saver);
  const loadA = batcher.load(1);
  const writeA = batcher.save(1, 1);
  const loadB = batcher.load(1);

  expect(loadA).not.toBe(loadB);
  const result = await Promise.all([loadA, writeA, loadB]);
  expect(result).toEqual(["1-1", undefined, "2-1"]);

  expect(loader).toHaveBeenCalledTimes(2);
  expect(saver).toHaveBeenCalledTimes(1);
});

it("handles returning errors in batchLoader as rejected promises", () => {
  const loader = async (keys: any[]) => [new Error("TEST")];
  const batcher = new DataBatcher(loader);
  expect(batcher.load(1)).rejects.toThrow("TEST");
});

it("handles returning errors in batchSaver as rejected promises", () => {
  const loader = async () => [];
  const saver = async (writes: [any,any][]) => [new Error("TEST")];
  const batcher = new DataBatcher(loader, saver);
  expect(batcher.save(1, "BLAH")).rejects.toThrow("TEST");
});

it("rejects if batchLoadFn returns non-Promise", () => {
  const loader = () => false;
  // @ts-ignore
  const batcher = new DataBatcher(loader);
  return expect(batcher.load(1)).rejects.toThrow(
    "batchLoadFn must return Promise<Array<value>> but got: false"
  );
});

it("rejects if batchLoadFn returns non-Array", () => {
  const loader = async () => true;
  // @ts-ignore
  const batcher = new DataBatcher(loader);
  return expect(batcher.load(1)).rejects.toThrow(
    "batchLoadFn must return Promise<Array<value>> but got: Promise<true>"
  );
});

it("rejects if batchLoadFn resolve to array with wrong length", () => {
  const loader = async () => [true];

  const batcher = new DataBatcher(loader);
  return expect(batcher.loadMany([1, 2])).rejects.toThrow(
    "batchLoadFn must return Promise<Array<value>> of length 2 but got length: 1"
  );
});

it("rejects if batchSaveFn returns non-Promise", () => {
  const loader = async keys => keys;
  const saver = () => false;
  // @ts-ignore
  const batcher = new DataBatcher(loader, saver);
  return expect(batcher.save(1, "test")).rejects.toThrow(
    "batchSaveFn must return Promise<Array<any>> but got: false"
  );
});

it("rejects if batchSaveFn returns non-Array", () => {
  const loader = async keys => keys;
  const saver = async () => true;
  // @ts-ignore
  const batcher = new DataBatcher(loader, saver);

  return expect(batcher.save(1, "test")).rejects.toThrow(
    "batchSaveFn must return Promise<Array<any>> but got: Promise<true>"
  );
});

it("rejects if batchSaveFn resolve to array with wrong length", () => {
  const loader = async keys => keys;
  const saver = async (writes: [any,any][]) => [];
  const batcher = new DataBatcher(loader, saver);
  return expect(batcher.save(1, "test")).rejects.toThrow(
    "batchSaveFn must return Promise<Array<any>> of length 1 but got length: 0"
  );
});

runTests();
