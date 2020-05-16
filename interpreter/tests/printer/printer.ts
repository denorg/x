import Interpreter from "../../mod.ts";
import joinStrings from "./actions/joinStrings.ts";
import validateString from "./constraints/validateString.ts";

const model = {
  variables: ["Hello!", "This", "is", "a", "test."],
  actions: [joinStrings],
  initialState: { message: "", sideEffects: [] },
  constraints: [validateString]
};

export default function main() {
  const printer = new Interpreter(model);
  const [{ message }, [isValid]] = printer.interpret();
  return { isValid, message } as const;
}

main();

export type TVars = typeof model["variables"];
export type TState = typeof model["initialState"];
