import type XRange from "./typings/xrange";
type Predicate = unknown; // TODO: define
type NextFactory = unknown; // TODO: define

/** @internal */
declare function xrangeLooplike(start: number, predicate: Predicate, next: NextFactory): XRange; // TODO: export default
