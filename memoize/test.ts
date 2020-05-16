import memoize from './mod.ts'

const add = (a : any, b: any) => a + b;
const memoizedFn = memoize(add);

console.log(memoizedFn(1, 2)); // 3

console.log(memoizedFn(1, 2)); // 3
// Add function is not executed: previous result is returned
