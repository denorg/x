import {
  assertEquals
} from "https://deno.land/std@v0.35.0/testing/asserts.ts";
import { Pool } from "./mod.ts";

const { test } = Deno;

async function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

interface Db {
  query(params: string): Promise<any>; // query data
  disconnect(): void; // disconnect
}

function connect(): Db {
  return {
    query: async (params: string) => {
      return "axetroy";
    },
    disconnect: () => {}
  };
}

test(async function testPool() {
  const pool = new Pool<Db>({
    min: 1,
    max: 10,
    creator: async (pool, id) => {
      return connect();
    },
    destroyer: async (pool, resource) => {
      return resource.resource.disconnect();
    }
  });

  assertEquals(pool.size, 0);

  const conn = await pool.get();

  assertEquals(pool.size, 1);

  const name: string = await conn.query("name");

  assertEquals(name, "axetroy");

  await pool.destroy();

  assertEquals(pool.size, 0);
  assertEquals(pool.destroyed, true);
});

test(async function testPoolWithMultipleResource() {
  const pool = new Pool<Db>({
    min: 1,
    max: 10,
    creator: async (pool, id) => {
      return connect();
    },
    destroyer: async (pool, resource) => {
      return resource.resource.disconnect();
    }
  });

  assertEquals(pool.size, 0);

  // get resource 1st
  const conn = await pool.get();

  assertEquals(pool.size, 1);

  {
    let currentSize = 1;

    for (let i = 0; i < 5; i++) {
      await pool.get();
      currentSize++;

      assertEquals(pool.size, currentSize);
    }

    assertEquals(pool.size, 6);

    for (let i = 0; i < 100; i++) {
      await pool.get();
    }

    // pool size max to 10
    assertEquals(pool.size, 10);
  }

  const name: string = await conn.query("name");

  assertEquals(name, "axetroy");

  await pool.destroy();

  assertEquals(pool.size, 0);
});

test(async function testPoolWithAutoClean() {
  const pool = new Pool<Db>({
    min: 1,
    max: 10,
    idle: 1000, // 1 s to idle
    creator: async (pool, id) => {
      return connect();
    },
    destroyer: async (pool, resource) => {
      return resource.resource.disconnect();
    }
  });

  assertEquals(pool.size, 0);

  // Fill the pond
  for (let i = 0; i < 100; i++) {
    await pool.get();
  }

  assertEquals(pool.size, 10);

  await sleep(1000 * 3);

  assertEquals(pool.size, 0);

  pool.destroy();
});
