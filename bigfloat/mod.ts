// bigfloat-deno v1.0.0
import * as arithmetic from "./lib/arithmetic.ts";
import { set_precision } from "./lib/constants.ts";
import * as constructors from "./lib/constructors.ts";
import evaluate from "./lib/interpreter.ts";
import * as predicates from "./lib/predicates.ts";
import * as relational from "./lib/relational.ts";

export { Decimal } from "./lib/decimal.ts";
export { BigFloat } from "./lib/types.ts";

export default Object.freeze({
  BigFloat: constructors.make,
  evaluate,
  set_precision,
  ...arithmetic,
  ...predicates,
  ...constructors,
  ...relational,
});
