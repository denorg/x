/**
 * Create a function that calls and cache a function once
 * @param fn Function to be invoked once
 * @returns Function that returns result of first-time execution of `fn`
 *
 * @example
 *   import once from 'https://ksxgithub.github.io/deno-once/index.js'
 *   const ran = once(Math.random)
 *   console.log(ran() === ran()) // => true
 */
export declare function once<Return> (fn: () => Return): () => Return
export default once
