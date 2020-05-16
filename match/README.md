## Match

Deno module to match functions on expressions

#### Getting Started

```typescript
import match from 'https://raw.githubusercontent.com/gustavofsantos/match-ts/master/match.ts';

class Just {
  public value = undefined;

  constructor(value: any) {
    this.value = value;
  }
}
class Nothing {}

const maybe =
  (thing: any) =>
    thing ? new Just(thing) : new Nothing();

match(
  maybe(undefined), [
    (x) => x instanceof Just,
    (mx) => console.log(`is Just ${(mx as Just).value}`),
  ], [
    (x) => x instanceof Nothing,
    () => console.log('is Nothing'),
  ])

// is Nothing
```