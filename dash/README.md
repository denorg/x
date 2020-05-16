# Dash

![Dash Logo](https://siasky.net/IABHPlF8d2jbzCQtJlkTSl_E-cyNHkvH2XtsnTHOAWAqPA)

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/dash/mod.ts)
[![GitHub issues](https://img.shields.io/github/issues/xpyxel/dash)](https://github.com/xpyxel/dash/issues)
[![GitHub forks](https://img.shields.io/github/forks/xpyxel/dash)](https://github.com/xpyxel/dash/network)
[![GitHub stars](https://img.shields.io/github/stars/xpyxel/dash)](https://github.com/xpyxel/dash/stargazers)
[![GitHub license](https://img.shields.io/github/license/xpyxel/dash)](https://github.com/xpyxel/dash/blob/master/LICENSE)

Dash is a simple, powerful, and efficient LRU cache for Deno.

## About

Dash is a efficient LRU (Least Recently Used) cache library.  
This means that when the cache hits it's size limit, it deletes the least used item.  
If you set your cache limit to 1000 items, and add 1001 items, the least used item will be removed.

## Usage

```ts
const cache = new Cache({
    limit: 50000,
    serialize: false,
});
cache.set('hello world', 'some value');
const v = cache.get('hello world');
console.log(v);
```
