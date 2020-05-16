# EaiserColors
Eaiser colors is a wrapper for the std/colors module with the goal of making it much eaiser to see what is happening

# Usage
The module simply modifies the String prototype so usage is simple. Simply import the module then tack a .color() onto the string you want to modify.

```
import "https://deno.land/x/eaisercolors/mod.ts"
console.log("Hello World".red())
```

# Comparison

Unlike std/colors, EaiserColors makes seeing what is happening much eaiser as there is not a ton of wrapped parentheses, but instead prototypes. This makes reading and writing code much simplier as there is no need for counting and matching parentheses

std/colors
```
import { bgBlue, red, bold, blue, } from "https://deno.land/std/colors/mod.ts";

console.log(bgBlue(red(bold("Hello"))) + bold(blue(" world!")));
```
EaiserColors
```
import "https://deno.land/x/eaisercolors/mod.ts"
console.log("Hello".bgBlue().red().bold() + " world!".bold().blue())
```

# Full API
The full API is fairly simple all of the following modifiers are supported. They all do exactly what one would expect they do.
bgBlack, bgBlue, bgCyan, bgGreen, bgMagenta, bgRed, bgWhite, bgYellow, black, blue, bold, cyan, dim, gray, green, hidden, inverse, italic, magenta, red, reset, strikethrough, underline, white and yellow