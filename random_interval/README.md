# deno random interval [![Build Status](https://travis-ci.org/zekth/deno_random_interval.svg?branch=master)](https://travis-ci.org/zekth/deno_random_interval)

```ts
import { randomInterval, ClearInterval } from "./mod.ts";

const i: ClearInterval = randomInterval(() => {
  console.log("foo");
}, 50); // will prompt randomly foo in the console every 0-50ms

setTimeout(i.clear, 1000); // clear the interval after 1second

```
