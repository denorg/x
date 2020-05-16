# Mixins

[![version](https://img.shields.io/badge/release-v0.3.0-success)](https://github.com/udibo/mixins/tree/v0.3.0)
[![CI](https://github.com/udibo/mixins/workflows/CI/badge.svg)](https://github.com/udibo/mixins/actions?query=workflow%3ACI)
[![deno version](https://img.shields.io/badge/deno-v1.0.0-success)](https://github.com/denoland/deno/tree/v1.0.0)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/mixins/mod.ts)
[![license](https://img.shields.io/github/license/udibo/mixins)](https://github.com/udibo/mixins/blob/master/LICENSE)

This module provides a few basic functions to help combine objects or build up classes from partial classes.

## Usage

`apply.ts` module provides 3 methods for mixing objects and classes together.

### applyMixins

Applies properties of mixins to instance.

Using `applyMixins` to add properties to an object:

```ts
import { applyMixins } from "https://raw.githubusercontent.com/udibo/mixins/v0.3.0/apply.ts";
interface Point {
  x: number;
  y: number;
}
interface TimePoint {
  time: number;
}
interface Point4D extends Point, TimePoint {
  z: number;
}
const point1: Point = { x: 2, y: 3 };
const point2: TimePoint = { time: 5 };
const point3: Point4D = { z: 7 } as Point4D;
applyMixins(point3, [point1, point2]);

point3; // { time: 5, x: 2, y: 3, z: 7 }
```

Using `applyMixins` to add properties to a function:

```ts
import { applyMixins } from "https://raw.githubusercontent.com/udibo/mixins/v0.3.0/apply.ts";
interface Point {
  x: number;
  y: number;
}
interface TimePoint {
  time: number;
}
interface Point4D extends Point, TimePoint {
  (x: number, y: number, z: number, time: number): string;
  z: number;
  toString(): string;
}
const point1: Point = { x: 2, y: 3 };
const point2: TimePoint = { time: 5 };
const point3: Point4D = function (
  x: number,
  y: number,
  z: number,
  time: number,
): string {
  return [x, y, z, time].join(", ");
} as Point4D;
applyMixins(
  point3,
  [point1, point2, { z: 7, toString: function (this: Point4D) {
    return [this.x, this.y, this.z, this.time].join(", ");
  } }],
);

point3(1, 2, 3, 4); // "1, 2, 3, 4"
point3.toString(); // "2, 3, 7, 5"
```

Using `applyMixins` to add properties to a class:

```ts
import { applyMixins } from "https://raw.githubusercontent.com/udibo/mixins/v0.3.0/apply.ts";
interface Point {
  x: number;
  y: number;
}
interface TimePoint {
  time: number;
}
interface Point4D extends Point, TimePoint {
  new (x: number, y: number, z: number, time: number): Point4D;
  z: number;
  toArray(): [number, number, number, number];
  toString(): string;
}
class Point4D {
  static x: number;
  static y: number;
  static z: number;
  static time: number;

  constructor(
    public x: number,
    public y: number,
    public z: number,
    public time: number,
  ) {}

  static example(): string {
    return Point4D.prototype.toArray.call(Point4D).join(", ");
  }

  toString() {
    return this.toArray().join(", ");
  }
}
const point1: Point = { x: 2, y: 3 };
const point2: TimePoint = { time: 5 };
applyMixins(Point4D, [point1, point2, { z: 7 }]);
applyMixins(Point4D.prototype, [{ toArray: function () {
  return [this.x, this.y, this.z, this.time];
} }]);
const point3: Point4D = new Point4D(1, 2, 3, 4);

Point4D.example(); // "2, 3, 7, 5"
point3.toString(); // "1, 2, 3, 4"
```

### applyInstanceMixins

Applies properties of base class prototypes to instance.

```ts
import { applyMixins, applyInstanceMixins } from "https://raw.githubusercontent.com/udibo/mixins/v0.3.0/apply.ts";
class Point {
  constructor(public x: number, public y: number) {}

  getPosition(): string {
    return [this.x, this.y].join(", ");
  }
}
class TimePoint {
  constructor(public time: number) {}

  getTime(): number {
    return this.time;
  }
}
interface Point4D extends Point, TimePoint {
  (x: number, y: number, z: number, time: number): string;
  z: number;
  toString(): string;
}
class Point4DPartial {
  constructor(public z: number) {}

  toString(this: Point4D): string {
    return [this.getPosition(), this.z, this.getTime()].join(", ");
  }
}
const point: Point4D = function (
  x: number,
  y: number,
  z: number,
  time: number,
): string {
  return [x, y, z, time].join(", ");
} as Point4D;
applyInstanceMixins(point, [Point, TimePoint, Point4DPartial]);
applyMixins(point, [{ time: 5, x: 2, y: 3, z: 7 }]);

point(1, 2, 3, 4); // "1, 2, 3, 4"
point.toString(); // "2, 3, 7, 5"
```

### applyClassMixins

Applies properties of base class prototypes to class prototype.

```ts
import { applyMixins, applyClassMixins } from "https://raw.githubusercontent.com/udibo/mixins/v0.3.0/apply.ts";
class Point {
  constructor(public x: number, public y: number) {}

  getPosition(): string {
    return [this.x, this.y].join(", ");
  }
}
class TimePoint {
  constructor(public time: number) {}

  getTime(): number {
    return this.time;
  }
}
interface Point4D extends Point, TimePoint {
  (x: number, y: number, z: number, time: number): string;
  z: number;
  toArray(): [number, number, number, number];
  toString(): string;
}
class Point4D {
  static x: number;
  static y: number;
  static z: number;
  static time: number;

  constructor(
    public x: number,
    public y: number,
    public z: number,
    public time: number,
  ) {}

  static example(): string {
    return Point4D.prototype.toArray.call(Point4D).join(", ");
  }

  toString() {
    return this.toArray().join(", ");
  }
}
class Point4DPartial {
  toArray(this: Point4D): [number, number, number, number] {
    return [this.x, this.y, this.z, this.time];
  }
}
applyClassMixins(Point4D, [Point, TimePoint, Point4DPartial]);
applyMixins(Point4D, [{ time: 5, x: 2, y: 3, z: 7 }]);

Point4D.example(); // "2, 3, 7, 5"

const point: Point4D = new Point4D(1, 2, 3, 4);

point.toArray(); // [1, 2, 3, 4]
point.toString(); // "1, 2, 3, 4"
point.getPosition(); // "1, 2"
point.getTime(); // 4
```

## License

[MIT](LICENSE)
