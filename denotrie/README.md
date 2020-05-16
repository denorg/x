# Deno Trie [![Build Status](https://travis-ci.org/silver-xu/deno-trie.svg?branch=master)](https://travis-ci.org/silver-xu/quick-trie)

> Deno implementation of Trie for faster searches

## Trie

A trie structure an efficient way to match strings. It's worst computational complexity is O(N) where N is the length of the key.

For this reason trie search is commonly used in routing algorithms on web servers, or for type ahead searches.

## Features

- Pattern matching in linear time
- Efficient String Searching
- Static Typing

## Get Started

### Installation
Adding the following to deps.ts

```typescript
export * from "https://raw.githubusercontent.com/silver-xu/deno-trie/master/mod.ts";
```
### Simple Usage

By default, key matching are case insensitive.

```typescript
const root = init<number>();
add(root, 'foo', 1);

console.log(get(root, 'foo')); // 1
console.log(get(root, 'FOO')); // 1
```

To disable ignore casing, simply pass `config` object to the `init` function

```typescript
const root = init<number>({
  ignoreCasing: false,
});
add(root, 'foo', 1);

console.log(get(root, 'foo')); // 1
console.log(get(root, 'FOO')); // undefined
```

### Search String

```typescript
const root = init<number>();
add(root, 'hello world', 1);
add(root, 'world class', 2);

console.log(search(root, 'world')); // [1, 2];
console.log(search(root, 'hello')); // [1];
console.log(search(root, 'class')); // [2];
```
