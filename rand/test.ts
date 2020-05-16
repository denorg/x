// Copyright (c) 2019 Rafał Pocztarski. All rights reserved.
// MIT License (Expat). See: https://github.com/rsp/deno-rand

import { test } from 'https://deno.land/std@v0.25.0/testing/mod.ts';
import { assert } from 'https://deno.land/std@v0.25.0/testing/asserts.ts';

import { rand, testRng, ranges } from './mod.ts';

const defaults = {
  min: 0,
  max: 1,
  int: true,
  cover: true,
  num: 1000,
  limit: 100000,
}

const tests = {
   u1: { num: 1e3, limit: 1e6 },
   u2: { num: 1e3, limit: 1e6 },
   u3: { num: 1e3, limit: 1e6 },
   u4: { num: 1e3, limit: 1e6 },
   u5: { num: 1e4, limit: 1e6 },
   u6: { num: 1e4, limit: 1e6 },
   u7: { num: 1e4, limit: 1e6 },
   u8: { num: 1e4, limit: 1e6 },
   u9: { num: 1e4, limit: 1e6 },
  u10: { num: 1e4, limit: 1e6 },
  u11: { num: 1e4, limit: 1e6 },
  u12: { num: 1e5, limit: 1e6 },
  u13: { num: 1e5, limit: 1e6 },
  u14: { num: 1e5, limit: 1e6 },
  u15: { num: 1e5, limit: 1e6 },
  u16: { num: 1e5, limit: 1e6 },
  u32: { num: 1e6, limit: 1e6, cover: false },
   s1: { num: 1e3, limit: 1e6 },
   s2: { num: 1e3, limit: 1e6 },
   s3: { num: 1e3, limit: 1e6 },
   s4: { num: 1e3, limit: 1e6 },
   s5: { num: 1e4, limit: 1e6 },
   s6: { num: 1e4, limit: 1e6 },
   s7: { num: 1e4, limit: 1e6 },
   s8: { num: 1e4, limit: 1e6 },
   s9: { num: 1e4, limit: 1e6 },
  s10: { num: 1e4, limit: 1e6 },
  s11: { num: 1e4, limit: 1e6 },
  s12: { num: 1e5, limit: 1e6 },
  s13: { num: 1e5, limit: 1e6 },
  s14: { num: 1e5, limit: 1e6 },
  s15: { num: 1e5, limit: 1e6 },
  s16: { num: 1e5, limit: 1e6 },
  s32: { num: 1e6, limit: 1e6, cover: false },
  f64: { num: 1e6, limit: 1e6, cover: false, int: false },
};

for (let k in tests) {
  test({
    name: `rand.${k} range`,
    async fn() {
      const [ minR, maxR ] = ranges[k];
      const { min, max } = testRng({
        ...defaults,
        ...tests[k],
        min: minR,
        max: maxR,
        rng: rand[k],
      });
      const a = (min - minR) / (maxR - minR);
      const b = (maxR - max) / (maxR - minR);
      console.log({ min, minR, max, maxR });
      assert(a < 1e-5, `Minimum returned number ${min} to far from range limit ${minR} (a ${a})`);
      assert(b < 1e-5, `Maximum returned number ${max} to far from range limit ${maxR} (b ${b})`);
    }
  });  
}
