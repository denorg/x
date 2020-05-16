[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ralusek/indigobird/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/indigobird.svg?style=flat)](https://www.npmjs.com/package/indigobird)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ralusek/indigobird/blob/master/LICENSE)

### What is indigobird?
Much of the same functionality as `bluebird`, except everything allows for concurrency and handlers, as well as additional functionality, such as asynchronous `.reduce`.

### Install
Node Install:
```bash
$ npm install --save indigobird
```

Deno Install:
```javascript
import indigobird from 'https://deno.land/x/indigobird/src/index.ts';
```


### Where it's like bluebird:

```javascript
import indigobird from 'indigobird';

// Like Promise.all or bluebird's variant
indigobird.all([
  doSomethingAsync(),
  doSomethingAsync(),
  doSomethingAsync(),
]);

// Like bluebird's .some, we wait for `amount` to resolve
// successfully before resolving the batch.
indigobird.some([
  doSomethingAsync(),
  doSomethingAsync(),
  doSomethingAsync(),
], { amount: 2 });

// Like bluebird's .props, we resolve the promises at the keys'
// values, and map them onto a result object with the same keys
indigobird.props({
  head: getHeadAsync(),
  shoulders: getShouldersAsync(),
  knees: getKneesAsync(),
  toes: getToesAsync(),
});

// Like .some, but has `amount` set to 1.
indigibird.any([
  doSomethingAsync(),
  doSomethingAsync(),
  doSomethingAsync(),
]);
```

### Where it's NOT like bluebird
Rather than just handing an array of promises, like `Promise.all` or bluebird's `.some`, all of these utilities can also be passed a handler argument
```javascript
// This then behaves like bluebird's .map, where
// arguments in an array will be passed into an asynchronous handler,
// and can therefore have their concurrency specified in the `concurrency`
// argument.
indigobird.some(userIds, (userId) => {
  return validateAndFetchUser(userId);
}, { amount: 5, concurrency: 3});
```
Rather than invoking the functions at a given prop, we could, for example, just pass them instead. Then we could invoke them in the handler, and benefit from having control over concurrency.
```javascript
indigobird.props({
  head: getHeadAsync,
  shoulders: getShouldersAsync,
  knees: getKneesAsync,
  toes: getToesAsync,
}, fn => fn(), { concurrency: 3 });
```
There is also unique functionality typically unavailable to asynchronous libraries, such as `.reduce`.
```javascript
const arr = [1, 2, 3, 6, 4, 2, 9, 1, 64];
const sum = await reduce(arr, async (getAggregate, n) => {
  // Notice that because these handlers are meant to be executed
  // asynchronously, rather than passing in `sum`, or the equivalent
  // aggregate value, which would have issues with having the closure
  // capture an aggregate value which may have become stale during
  // concurrent execution of peer handlers, we instead provide a getter.
  // This way, when ready to use the aggregate, the getter can be invoked
  // for access to the aggregate value that is in up to date.
  const someValue = await someAsynchronousThing(n);
  return getAggregate() + someValue;
}, 0, { concurrency: 6 });
```

