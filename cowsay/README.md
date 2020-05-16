# cowsay

Configurable talking cow for deno

[![Build Status](https://api.travis-ci.com/fakoua/cowsay.svg?branch=master)](https://travis-ci.com/fakoua/cowsay)
[![Build Status](https://github.com/fakoua/cowsay/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/fakoua/cowsay/actions)

```bash
 ________________
< Deno is Great! >
 ----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## Examples

```ts
import * as o from 'https://deno.land/x/cowsay/mod.ts'

let m = o.say({
    text: 'hello every one'
})
console.log(m)
```

Or you can trigger the cli:

```bash
deno https://deno.land/x/cowsay/cowsay.ts -t="Hello world"
```

## CLI arguments

```bash
arguments:
    --text       |   -t: Message Text [ex: --text="Hello world" ]
    --cow        |   -c: Cow image (default value is "cow") [ex: --cow="cat2" ]
    --mode       |   -m: Predefined eyes/tonges (from 1 to 8) [ex: --mode=3]
    --eyes       |   -e: Eyes of the image if exists (default: "oo") [ex: --eyes="@@" ]
    --tongue     |   -g: Tongue of the image (default: "U") [ex: --tongue="V" ]
    --random     |   -r: Pick random cow (default false) [ex: --random ]
    --think      |   -k: Use think insted of say (default false) [ex: --think ]
    --wrap       |   -w: Wrap the text (default false) [ex: --wrap ]
    --wrapLength | --wl: Where the message should be wrapped (default 40) [ex: --wrapLength=10 ]
    --list       | --ls: List the available cows

example:
    deno https://deno.land/x/cowsay/cowsay.ts -t="Hello World" -r
```

## Options

```ts
let m = o.say({
    text: 'hello',
    cow: 'cat', // Template for a cow (check the folder cows)
    eyes: 'oo', // Select the appearance of the cow's eyes, equivalent to cowsay -e
    tongue: 'U', // The tongue is configurable similarly to the eyes through -T and tongue_string, equivalent to cowsay -T
    wrap: false, // If it is specified, the given message will not be word-wrapped
    wrapLength: 40, // Specifies roughly where the message should be wrapped.
    mode: 1, // 1...9,
    random: false //Draw random cow
})
console.log(m)
```

## Credits

cowsay is heavily inspired by [cowsay](https://github.com/piuccio/cowsay) with deno support.

## License

[MIT](LICENSE)
