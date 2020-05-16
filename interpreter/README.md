# Interpreter

Interprets a description of your application and handles the rest.

### Made with Deno in mind. 😎

# Usage

```typescript
import Interpreter from "https://deno.land/x/interpreter/mod.ts";

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
a
const printer = new Interpreter(description);
const [{ message }, [hasMessage]] = printer.interpret();

if (hasMessage) {
  console.log(message);
} else {
  console.error("Message is empty!");
}
```

# API

**Variables** is an array of anything. Primitives, non primitives, functions, etc. **Variables** are immutable.

**Actions** is an array of functions which are required to have the same signature.

```
type TAction<V, S> = (variables: V[], state: S) => S
```

**Actions** are executed in the order they are inserted.

**Constraints** is an array of functions which are also required to have the same signature

```
type TConstraint<S> = (state: S) => boolean
```

**Constraints** can help ensure the state/output of the interpreter is valid by your definitions.

**State** is always an object, with properties the user can define. **State** is immutable. Each **Action** must return a brand new state.
