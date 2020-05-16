## Usage

```js

const add = (a, b) => a + b;
const memoizedFn = memoize(add);

memoizedFn(1, 2); // 3

memoizedFn(1, 2); // 3
// Add function is not executed: previous result is returned

memoizedFn(2, 3); // 5
// Add function is called to get new value

memoizedFn(2, 3); // 5
// Add function is not executed: previous result is returned

memoizedFn(1, 2); // 3
// Add function is called to get new value.
// While this was previously cached,
// it is not the latest so the cached result is lost
```
