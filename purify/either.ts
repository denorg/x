import { Maybe, Just, Nothing } from "./maybe.ts";

export type EitherPatterns<L, R, T> =
  | { Left: (l: L) => T; Right: (r: R) => T }
  | { _: () => T };

export interface Either<L, R> {
  constructor: typeof Either;
  /** Internal property and subject to breaking changes, please use some of the available methods on the object if you want to access it */
  __value: L | R;
  /** Returns true if `this` is `Left`, otherwise it returns false */
  isLeft(): this is Either<L, never>;
  /** Returns true if `this` is `Right`, otherwise it returns false */
  isRight(): this is Either<never, R>;
  toJSON(): L | R;
  inspect(): string;
  toString(): string;
  /** Given two functions, maps the value inside `this` using the first if `this` is `Left` or using the second one if `this` is `Right`.
   * If both functions return the same type consider using `Either#either` instead
   */
  bimap<L2, R2>(f: (value: L) => L2, g: (value: R) => R2): Either<L2, R2>;
  /** Maps the `Right` value of `this`, acts like an identity if `this` is `Left` */
  map<R2>(f: (value: R) => R2): Either<L, R2>;
  /** Maps the `Left` value of `this`, acts like an identity if `this` is `Right` */
  mapLeft<L2>(f: (value: L) => L2): Either<L2, R>;
  /** Applies a `Right` function over a `Right` value. Returns `Left` if either `this` or the function are `Left` */
  ap<R2>(other: Either<L, (value: R) => R2>): Either<L, R2>;
  /** Compares `this` to another `Either`, returns false if the constructors or the values inside are different, e.g. `Right(5).equals(Left(5))` is false */
  equals(other: Either<L, R>): boolean;
  /** Transforms `this` with a function that returns an `Either`. Useful for chaining many computations that may fail */
  chain<R2>(f: (value: R) => Either<L, R2>): Either<L, R2>;
  /** Flattens nested Eithers. `e.join()` is equivalent to `e.chain(x => x)` */
  join<R2>(this: Either<L, Either<L, R2>>): Either<L, R2>;
  /** Returns the first `Right` between `this` and another `Either` or the `Left` in the argument if both `this` and the argument are `Left` */
  alt(other: Either<L, R>): Either<L, R>;
  /** Takes a reducer and a initial value and returns the initial value if `this` is `Left` or the result of applying the function to the initial value and the value inside `this` */
  /** Returns `this` if it\'s a `Left`, otherwise it returns the result of applying the function argument to `this` and wrapping it in a `Right` */
  extend<R2>(f: (value: Either<L, R>) => R2): Either<L, R2>;
  /** Returns the value inside `this` or throws an error if `this` is a `Left` */
  unsafeCoerce(): R;
  /** Structural pattern matching for `Either` in the form of a function */
  caseOf<T>(patterns: EitherPatterns<L, R, T>): T;
  /** Returns the value inside `this` if it\'s `Left` or a default value if `this` is `Right` */
  leftOrDefault(defaultValue: L): L;
  /** Returns the value inside `this` if it\'s `Right` or a default value if `this` is `Left` */
  orDefault(defaultValue: R): R;
  /** Lazy version of `orDefault`. Takes a function that returns the default value, that function will be called only if `this` is `Left` */
  orDefaultLazy(getDefaultValue: () => R): R;
  /** Lazy version of `leftOrDefault`. Takes a function that returns the default value, that function will be called only if `this` is `Right` */
  leftOrDefaultLazy(getDefaultValue: () => L): L;
  /** Runs an effect if `this` is `Left`, returns `this` to make chaining other methods possible */
  ifLeft(effect: (value: L) => any): this;
  /** Runs an effect if `this` is `Right`, returns `this` to make chaining other methods possible */
  ifRight(effect: (value: R) => any): this;
  /** Constructs a `Just` with the value of `this` if it\'s `Right` or a `Nothing` if `this` is `Left` */
  toMaybe(): Maybe<R>;
  /** Constructs a `Just` with the value of `this` if it\'s `Left` or a `Nothing` if `this` is `Right` */
  leftToMaybe(): Maybe<L>;
  /** Given two map functions, maps using the first if `this` is `Left` or using the second one if `this` is `Right`.
   * If you want the functions to return different types depending on the either you may want to use `Either#bimap` instead
   * */
  either<T>(ifLeft: (value: L) => T, ifRight: (value: R) => T): T;
  /** Extracts the value out of `this` */
  extract(): L | R;
  reduce<T>(reducer: (accumulator: T, value: R) => T, initialValue: T): T;
}

interface EitherTypeRef {
  /** Takes a value and wraps it in a `Right` */
  of<L, R>(value: R): Either<L, R>;
  /** Takes a list of eithers and returns a list of all `Left` values */
  lefts<L, R>(list: Either<L, R>[]): L[];
  /** Takes a list of eithers and returns a list of all `Right` values */
  rights<L, R>(list: Either<L, R>[]): R[];
  /** Calls a function and returns a `Right` with the return value or an exception wrapped in a `Left` in case of failure */
  encase<L extends Error, R>(throwsF: () => R): Either<L, R>;
}

export const Either: EitherTypeRef = {
  of<L, R>(value: R): Either<L, R> {
    return right(value);
  },
  lefts<L, R>(list: Either<L, R>[]): L[] {
    return list.filter(x => x.isLeft()).map(x => x.__value as L);
  },
  rights<L, R>(list: Either<L, R>[]): R[] {
    return list.filter(x => x.isRight()).map(x => x.__value as R);
  },
  encase<L extends Error, R>(throwsF: () => R): Either<L, R> {
    try {
      return right(throwsF());
    } catch (e) {
      return left(e);
    }
  }
};

class Right<R, L = never> implements Either<L, R> {
  "constructor" = Either;

  __value: R;

  constructor(value: R) {
    this.__value = value;
  }

  isLeft(): false {
    return false;
  }

  isRight(): true {
    return true;
  }

  toJSON(): R {
    return this.__value;
  }

  inspect(): string {
    return `Right(${this.__value})`;
  }

  toString(): string {
    return this.inspect();
  }

  bimap<L2, R2>(_: (value: L) => L2, g: (value: R) => R2): Either<L2, R2> {
    return right(g(this.__value));
  }

  map<R2>(f: (value: R) => R2): Either<L, R2> {
    return right(f(this.__value));
  }

  mapLeft<L2>(_: (value: L) => L2): Either<L2, R> {
    return this as any;
  }

  ap<R2>(other: Either<L, (value: R) => R2>): Either<L, R2> {
    return other.isLeft() ? other : this.map(other.__value as any);
  }

  equals(other: Either<L, R>): boolean {
    return other.isRight() ? this.__value === other.__value : false;
  }

  chain<R2>(f: (value: R) => Either<L, R2>): Either<L, R2> {
    return f(this.__value);
  }

  join<R2>(this: Either<L, Either<L, R2>>): Either<L, R2> {
    return this.__value as any;
  }

  alt(_: Either<L, R>): Either<L, R> {
    return this;
  }

  reduce<T>(reducer: (accumulator: T, value: R) => T, initialValue: T): T {
    return reducer(initialValue, this.__value);
  }

  extend<R2>(f: (value: Either<L, R>) => R2): Either<L, R2> {
    return right(f(this));
  }

  unsafeCoerce(): R {
    return this.__value;
  }

  caseOf<T>(patterns: EitherPatterns<L, R, T>): T {
    return "_" in patterns ? patterns._() : patterns.Right(this.__value);
  }

  leftOrDefault(defaultValue: L): L {
    return defaultValue;
  }

  orDefault(_: R): R {
    return this.__value;
  }

  orDefaultLazy(_: () => R): R {
    return this.__value;
  }

  leftOrDefaultLazy(getDefaultValue: () => L): L {
    return getDefaultValue();
  }

  ifLeft(_: (value: L) => any): this {
    return this;
  }

  ifRight(effect: (value: R) => any): this {
    return effect(this.__value), this;
  }

  toMaybe(): Maybe<R> {
    return Just(this.__value);
  }

  leftToMaybe(): Maybe<L> {
    return Nothing;
  }

  either<T>(_: (value: L) => T, ifRight: (value: R) => T): T {
    return ifRight(this.__value);
  }

  extract(): L | R {
    return this.__value;
  }
}

class Left<L, R = never> implements Either<L, R> {
  "constructor" = Either;
  __value: L;

  constructor(value: L) {
    this.__value = value;
  }

  isLeft(): true {
    return true;
  }

  isRight(): false {
    return false;
  }

  toJSON(): L {
    return this.__value;
  }

  inspect(): string {
    return `Left(${this.__value})`;
  }

  toString(): string {
    return this.inspect();
  }

  bimap<L2, R2>(f: (value: L) => L2, _: (value: R) => R2): Either<L2, R2> {
    return left(f(this.__value));
  }

  map<R2>(_: (value: R) => R2): Either<L, R2> {
    return this as any;
  }

  mapLeft<L2>(f: (value: L) => L2): Either<L2, R> {
    return left(f(this.__value));
  }

  ap<R2>(other: Either<L, (value: R) => R2>): Either<L, R2> {
    return other.isLeft() ? other : (this as any);
  }

  equals(other: Either<L, R>): boolean {
    return other.isLeft() ? other.__value === this.__value : false;
  }

  chain<R2>(_: (value: R) => Either<L, R2>): Either<L, R2> {
    return this as any;
  }

  join<R2>(this: Either<L, Either<L, R2>>): Either<L, R2> {
    return this as any;
  }

  alt(other: Either<L, R>): Either<L, R> {
    return other;
  }

  reduce<T>(_: (accumulator: T, value: R) => T, initialValue: T): T {
    return initialValue;
  }

  extend<R2>(_: (value: Either<L, R>) => R2): Either<L, R2> {
    return this as any;
  }

  unsafeCoerce(): never {
    throw new Error("Either got coerced to a Left");
  }

  caseOf<T>(patterns: EitherPatterns<L, R, T>): T {
    return "_" in patterns ? patterns._() : patterns.Left(this.__value);
  }

  leftOrDefault(_: L): L {
    return this.__value;
  }

  orDefault(defaultValue: R): R {
    return defaultValue;
  }

  orDefaultLazy(getDefaultValue: () => R): R {
    return getDefaultValue();
  }

  leftOrDefaultLazy(_: () => L): L {
    return this.__value;
  }

  ifLeft(effect: (value: L) => any): this {
    return effect(this.__value), this;
  }

  ifRight(_: (value: R) => any): this {
    return this;
  }

  toMaybe(): Maybe<R> {
    return Nothing;
  }

  leftToMaybe(): Maybe<L> {
    return Just(this.__value);
  }

  either<T>(ifLeft: (value: L) => T, _: (value: R) => T): T {
    return ifLeft(this.__value);
  }

  extract(): L | R {
    return this.__value;
  }
}

const left = <L, R = never>(value: L): Either<L, R> => new Left(value);

const right = <R, L = never>(value: R): Either<L, R> => new Right(value);

export { left as Left, right as Right };
