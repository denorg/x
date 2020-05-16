# Tokenizer
[![Actions Status](https://github.com/eliassjogreen/deno_tokenizer/workflows/Tests/badge.svg)](https://github.com/eliassjogreen/deno_tokenizer/actions)
[![GitHub license](https://img.shields.io/github/license/eliassjogreen/deno_tokenizer)](https://github.com/eliassjogreen/deno_tokenizer)

A simple tokenizer for deno.

## Example
```TypeScript
import { Tokenizer } from "https://deno.land/x/tokenizer/mod.ts";

const tokenizer = new Tokenizer("abc 123 HELLO [a cool](link)", [
    { type: "HELLO",  pattern: "HELLO" },
    { type: "WORD",   pattern: /[a-zA-Z]+/ },
    { type: "DIGITS", pattern: /\d+/, value: m => Number.parseInt(m.match) },
    { type: "LINK",   pattern: /\[([^\[]+)\]\(([^\)]+)\)/ },
    { type: "SPACE",  pattern: / /, ignore: true } // Or leave type blank and remove "ignore: true"
]);

// The first option:
// console.log(...tokenizer);
// => { type: "WORD", match: "abc", value: "abc", groups: [], position: { start: 0, end: 3 } },
//    { type: "DIGITS", match: "123", value: 123, groups: [], position: { start: 4, end: 7 } },
//    { type: "HELLO", match: "HELLO", value: "HELLO", groups: [], position: { start: 8, end: 13 } },
//    { type: "LINK", match: "[a cool](link)", value: "[a cool](link)", groups: [ "a cool", "link" ], position: { start: 14, end: 28 } }

// The second option:
while (!tokenizer.done) {
    console.log(tokenizer.next().value);
}
// => { type: "WORD", match: "abc", value: "abc", groups: [], position: { start: 0, end: 3 } }
// => { type: "DIGITS", match: "123", value: 123, groups: [], position: { start: 4, end: 7 } }
// => { type: "HELLO", match: "HELLO", value: "HELLO", groups: [], position: { start: 8, end: 13 } }
// => { type: "LINK", match: "[a cool](link)", value: "[a cool](link)", groups: [ "a cool", "link" ], position: { start: 14, end: 28 } }

// The third option:
// console.log(tokenizer.tokenize()); // Add a parameter to the tokenize method to override the source string
// => [ { type: "WORD", match: "abc", value: "abc", groups: [], position: { start: 0, end: 3 } },
//      { type: "DIGITS", match: "123", value: 123, groups: [], position: { start: 4, end: 7 } },
//      { type: "HELLO", match: "HELLO", value: "HELLO", groups: [], position: { start: 8, end: 13 } },
//      { type: "LINK", match: "[a cool](link)", value: "[a cool](link)", groups: [ "a cool", "link" ], position: { start: 14, end: 28 } } ]
```

## TODO
- [x] Custom patterns using functions
- [x] Add position information to Token
- [x] Array patterns (Multiple patterns for the same rule)
- [x] Documentation
- [x] Better error handling
- [x] Group matching
- [x] Value transform
- [ ] More and better tests for everything
- [ ] Examples
- [ ] Line and column information? Or just a helper function to get line and column from index
- [ ] BNF / EBNF ?
- [ ] Generate a tokenizer
