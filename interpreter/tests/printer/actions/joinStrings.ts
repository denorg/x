import { TState, TVars } from "../printer.ts";
import printString from "../effects/printString.ts";

export default function joinStrings(vars: TVars, state: TState) {
  const message = vars.join(" ");
  const output = { ...state, message, sideEffects: [printString] };
  return output;
}
