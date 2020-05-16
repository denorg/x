/*
 * DefaultDict is a Map with a default value.
 *
 *      const d = new DefaultDict(0)
 *      d.get('x') === 0
 *
 */
export class DefaultDict<T, D> extends Map<T, D> {
  // Note: toStringTag is not working yet
  // [Symbol.toStringTag] = "DefaultDict"
  default: D;
  constructor(default_: D, m?: Map<T, D>) {
    if (m !== undefined) {
      super(m);
    } else {
      super(m);
    }
    this.default = default_;
  }
  get(key: T): D {
    const v = super.get(key);
    return v !== undefined ? v : this.default;
  }
}
