<p align="center">
  <a href="https://github.com/parzh/xrange/actions?query=workflow%3A%22Test+changes%22">
    <img alt="Test changes" src="https://github.com/parzh/xrange/workflows/Test%20changes/badge.svg" />
  </a>

  <a href="https://www.npmjs.com/package/xrange">
    <img alt="npm version" src="https://badge.fury.io/js/xrange.svg" />
  </a>

  <a href="https://www.npmjs.com/package/xrange">
    <img alt="npm size" src="https://img.shields.io/bundlephobia/min/xrange" />
  </a>

  <img alt="licence MIT" src="https://img.shields.io/npm/l/xrange" />
</p>

<p align="center">
  <a href="https://github.com/parzh/xrange">
    <img alt="github" src="https://img.shields.io/badge/GitHub-repository-444D56" />
  </a>

  <a href="https://www.npmjs.com/package/xrange">
    <img alt="npm" src="https://img.shields.io/badge/npm-package-cb3837" />
  </a>
</p>

<h1 align="center"><code>xrange</code></h1>
<h3 align="center">Python-esque iterator for number ranges</h3>

`xrange` is a function based on Python 3's [`range`](https://docs.python.org/3/library/stdtypes.html?highlight=range#ranges) class (or Python 2's [`xrange`](https://docs.python.org/2.7/library/functions.html#xrange) class). Like the one in Python, `xrange` creates virtual arrays (see [Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)) which allows getting values lazily. This prevents over-the-top memory consumption when using large numbers, and opens the possibility to create never-ending, infinite lists.

<p align="center">
  <sub>
    Created with <a href="https://npmjs.org/package/create-package-typescript"><code>create-package-typescript</code></a>
  </sub>
</p>

## [Examples](https://github.com/parzh/xrange/tree/master/docs/examples)

Simple iteration:

```ts
for (const number of xrange(5))
  console.log(number); // 0, 1, 2, 3, 4
```

#### Creation of arrays:

```ts
[ ...xrange(5) ];
// [ 0, 1, 2, 3, 4 ]
```

#### Infinite and backward iteration:

```ts
xrange(0, Infinity);
// 0, 1, 2, 3, … (never ends)
```

```ts
xrange(10, 0, -1);
// 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

#### Complex number sequences (see [#15](https://github.com/parzh/xrange/issues/15)):

```ts
xrange(1, (next) => next < 100, ([ last, prelast = 0 ]) => last + prelast);
// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
```

```ts
xrange(0, () => true, ([ last ]) => last ? 0 : 1);
// 0, 1, 0, 1, 0, 1, … (never ends)
```

#### Iteration with methods (see [#14](https://github.com/parzh/xrange/issues/14)):

```ts
xrange(17, 42, 5).forEach(number => {
  console.log(number); // 17, 22, 27, 32, 37
});
```

> See more in [/docs/examples](https://github.com/parzh/xrange/tree/master/docs/examples)

## `range` vs `xrange`

> Looking for less functionality in a smaller bundle? Check out [`@xrange/core`](https://npmjs.org/package/@xrange/core)

The main difference of `xrange` from [`range`](https://npmjs.org/package/range) is that `xrange` is an iterator, not an array constructor, &mdash; it yields numbers on demand, leaving array creation decision to user, which can always be done using the [`...` spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) or [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

While also having a larger bundle, `xrange` delegates the actual iteration to [`@xrange/core`](https://npmjs.org/package/@xrange/core), which is vastly smaller, and can be used on its own (in some cases the usage is different though).
