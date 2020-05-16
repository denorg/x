/**
 * Run matchers from one expression.
 * It will stop on first match and
 * return the result.
 * 
 * @param expr 
 * @param matchers 
 */
export default function match<A>(
  expr: A,
  ...matchers: [(expr: A) => boolean, (expr: A) => unknown][]): unknown {
    for (const [ matchFn, cb ] of matchers) {
      if (matchFn(expr)) {
        return cb(expr);
      }
    }
}