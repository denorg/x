import { assertEquals } from "./deps/std/testing/asserts.ts";
import { applyMixins, applyInstanceMixins, applyClassMixins } from "./apply.ts";

Deno.test("applyMixins to object", () => {
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
  assertEquals(point3, { time: 5, x: 2, y: 3, z: 7 });
  assertEquals(
    Object.getOwnPropertyNames(point3).sort(),
    ["time", "x", "y", "z"],
  );

  applyMixins(point3, [{ x: 11, y: 17 }, { y: 19, z: 23 }]);
  assertEquals(point3, { time: 5, x: 11, y: 19, z: 23 });
});

Deno.test("applyMixins to function", () => {
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
    [point1, point2, {
      z: 7,
      toString: function (this: Point4D) {
        return [this.x, this.y, this.z, this.time].join(", ");
      },
    }],
  );
  assertEquals(point3(1, 2, 3, 4), "1, 2, 3, 4");
  assertEquals(point3.toString(), "2, 3, 7, 5");
  assertEquals(
    Object.getOwnPropertyNames(point3).sort(),
    ["length", "name", "prototype", "time", "toString", "x", "y", "z"],
  );

  applyMixins(point3, [{ x: 11, y: 17 }, { y: 19, z: 23 }]);
  assertEquals(point3(1, 2, 3, 4), "1, 2, 3, 4");
  assertEquals(point3.toString(), "11, 19, 23, 5");
});

Deno.test("applyMixins to class", () => {
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
  applyMixins(Point4D.prototype, [{
    toArray: function () {
      return [this.x, this.y, this.z, this.time];
    },
  }]);

  assertEquals(Point4D.example(), "2, 3, 7, 5");
  assertEquals(
    Object.getOwnPropertyNames(Point4D).sort(),
    ["example", "length", "name", "prototype", "time", "x", "y", "z"],
  );
  assertEquals(
    Object.getOwnPropertyNames(Point4D.prototype).sort(),
    ["constructor", "toArray", "toString"],
  );

  applyMixins(Point4D, [{ x: 10, y: 16 }, { y: 18, z: 22 }]);
  assertEquals(Point4D.example(), "10, 18, 22, 5");

  const point3: Point4D = new Point4D(1, 2, 3, 4);

  assertEquals(point3.toString(), "1, 2, 3, 4");
  assertEquals(
    Object.getOwnPropertyNames(point3).sort(),
    ["time", "x", "y", "z"],
  );

  applyMixins(point3, [{ x: 11, y: 17 }, { y: 19, z: 23 }]);
  assertEquals(point3.toString(), "11, 19, 23, 4");
});

Deno.test("applyInstanceMixins", () => {
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
  assertEquals(point(1, 2, 3, 4), "1, 2, 3, 4");
  assertEquals(point.toString(), "2, 3, 7, 5");
  assertEquals(
    Object.getOwnPropertyNames(point).sort(),
    [
      "constructor",
      "getPosition",
      "getTime",
      "length",
      "name",
      "prototype",
      "time",
      "toString",
      "x",
      "y",
      "z",
    ],
  );
});

Deno.test("applyClassMixins", () => {
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

  assertEquals(Point4D.example(), "2, 3, 7, 5");
  assertEquals(
    Object.getOwnPropertyNames(Point4D).sort(),
    ["example", "length", "name", "prototype", "time", "x", "y", "z"],
  );
  assertEquals(
    Object.getOwnPropertyNames(Point4D.prototype).sort(),
    ["constructor", "getPosition", "getTime", "toArray", "toString"],
  );

  applyMixins(Point4D, [{ x: 10, y: 16 }, { y: 18, z: 22 }]);
  assertEquals(Point4D.example(), "10, 18, 22, 5");

  const point: Point4D = new Point4D(1, 2, 3, 4);

  assertEquals(point.toArray(), [1, 2, 3, 4]);
  assertEquals(point.toString(), "1, 2, 3, 4");
  assertEquals(point.getPosition(), "1, 2");
  assertEquals(point.getTime(), 4);
  assertEquals(
    Object.getOwnPropertyNames(point).sort(),
    ["time", "x", "y", "z"],
  );
});
