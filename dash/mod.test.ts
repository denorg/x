import { Cache } from "./mod.ts";

import {
  assertEquals,
  assertNotEquals,
  assert,
} from "https://deno.land/std@v0.50.0/testing/asserts.ts";

const ncache = new Cache({
  limit: 100000,
  serialize: false,
});

const scache = new Cache({
  limit: 100000,
  serialize: true,
});

const lcache = new Cache({ limit: 100000, logical: true });

function insertItems(cache: Cache, count: number) {
  for (let i = 0; i < count; i++) cache.set(i, { d: i });
}

function getItems(cache: Cache, count: number) {
  for (let i = 0; i < count; i++) {
    const value = cache.get(i);
    assertNotEquals(value, null, "The returned cache item is null");
    assertEquals(value.d, i, "Object 'd' property is not valid");
  }
}

// Unserialized Cache

Deno.test("Insert 100 Items (Unserialized)", () => insertItems(ncache, 100));
Deno.test("Get 100 Items (Unserialized)", () => getItems(ncache, 100));

Deno.test("Insert 1000 Items (Unserialized)", () => insertItems(ncache, 1000));
Deno.test("Get 1000 Items (Unserialized)", () => getItems(ncache, 1000));

Deno.test("Insert 10000 Items (Unserialized)", () =>
  insertItems(ncache, 10000));

Deno.test("Get 10000 Items (Unserialized)", () => getItems(ncache, 10000));

Deno.test("Insert 100000 Items (Unserialized)", () =>
  insertItems(ncache, 100000));

Deno.test("Get 100000 Items (Unserialized)", () => getItems(ncache, 100000));

Deno.test("Check For LRU Item Deletion (Unserialized)", () => {
  insertItems(ncache, 100001);
  assertEquals(ncache.get(0), null, "Least frequently used item not deleted");
});

Deno.test("Overflow Cache Limit (Unserialized) ", () =>
  insertItems(ncache, 200000));

// Serialized Cache

Deno.test("Insert 100 Items (Serialized)", () => insertItems(scache, 100));
Deno.test("Get 100 Items (Serialized)", () => getItems(scache, 100));

Deno.test("Insert 1000 Items (Serialized)", () => insertItems(scache, 1000));
Deno.test("Get 1000 Items (Serialized)", () => getItems(scache, 1000));

Deno.test("Insert 10000 Items (Serialized)", () => insertItems(scache, 10000));

Deno.test("Get 10000 Items (Serialized)", () => getItems(scache, 10000));

Deno.test("Insert 100000 Items (Serialized)", () =>
  insertItems(scache, 100000));

Deno.test("Get 100000 Items (Serialized)", () => getItems(scache, 100000));

Deno.test("Check For LRU Item Deletion (Serialized)", () => {
  insertItems(scache, 100001);
  assertEquals(scache.get(0), null, "Least frequently used item not deleted");
});

Deno.test("Overflow Cache Limit (Serialized) ", () =>
  insertItems(scache, 200000));

// Logical Cache Resizing

Deno.test("Overflow Logical Cache And Check Size", () => {
  insertItems(lcache, 200000);
  assert(lcache.limit > 100000, "The cache did not resize");
});
