Ported from https://github.com/sindresorhus/escape-string-regexp

# escape-string-regexp
[![Build Status](https://travis-ci.org/Sab94/escape_string_regexp.svg?branch=master)](https://travis-ci.org/Sab94/escape_string_regexp)

Escape RegExp special characters

## Usage

```typescript
import { escapeStringRegexp } from 'https://raw.githubusercontent.com/Sab94/escape-string-regexp/master/mod.ts'

const  a = escapeStringRegexp('\\ ^ $ * + ? . ( ) | { } [ ]');
console.log(a)

//result: '\\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]'
```

## License

MIT
