import { TState, TVars } from "../app.ts";
export default function(variables: TVars, state: TState) {
  const newState = { ...state, message: variables.join("\n") };
  return newState;
}
