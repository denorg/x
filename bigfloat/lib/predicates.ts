import { BIGINT_ZERO } from "./constants.ts";
import { integer } from "./constructors.ts";
import { eq } from "./relational.ts";
import { BigFloat } from "./types.ts";

export function is_big_float(big: any) {
  return (
    typeof big === "object" &&
    typeof big.coefficient === "bigint" &&
    Number.isSafeInteger(big.exponent)
  );
}

export function is_number(token: string) {
  return !Number.isNaN(Number(token));
}

export function is_negative(big: BigFloat) {
  return big.coefficient < BIGINT_ZERO;
}

export function is_positive(big: BigFloat) {
  return big.coefficient >= BIGINT_ZERO;
}

export function is_zero(big: BigFloat) {
  return big.coefficient === BIGINT_ZERO;
}

export function is_integer(a: BigFloat) {
  return eq(a, integer(a));
}
