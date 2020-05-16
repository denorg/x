import { DefaultDict } from "./defaultdict.ts";

/*
 * Counter is a Map with a default 0.
 * It can optionally consume an iterable.
 *
 *      const d = new Counter('a a a b b c'.split(' '))
 *      d.get('x') === 0
 *
 */
export class Counter<T> extends DefaultDict<T, number> {
  // TODO: toStringTag is not working yet
  // [Symbol.toStringTag] = "Counter"
  constructor(ls?: Iterable<T>) {
    super(0);
    for (const v of ls || []) {
      this.set(v, this.get(v) + 1);
    }
  }

  // TODO return Counter<T>
  mostCommon(n: number): Map<T, number> {
    return new Map(
      [...this.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
    );
  }

  // TODO update
  // TODO subtract
}
