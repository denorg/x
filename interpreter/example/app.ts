import Interpreter from "../mod.ts";
import print from "./demo/print.ts";
import nonEmptyMessage from "./demo/checkMessage.ts";
export type TDesc = typeof description;
export type TVars = TDesc["variables"];
export type TState = TDesc["initialState"];

const description = {
  variables: [
    "Hello World!",
    "This is a test.",
    "Each sentence is separated by a new line."
  ],
  actions: [print],
  initialState: {
    message: ""
  },
  constraints: [nonEmptyMessage]
};

const printer = new Interpreter(description);
const [{ message }, [hasMessage]] = printer.interpret();

if (hasMessage) {
  console.log(message);
} else {
  console.error("Message is empty!");
}
