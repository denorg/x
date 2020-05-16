# MD5

![ci](https://github.com/halvardssm/deno-md5/workflows/ci/badge.svg)

An MD5 implementation for [deno](https://deno.land) ported from [Joseph Myers](http://www.myersdaily.org/joseph/javascript/md5-text.html), inspired by [chiefbiiko](https://github.com/chiefbiiko/sha1) and adapted to Typescript.

## Usage

```js
import { md5 } from "https://deno.land/x/md5/mod.ts";

const hash = md5("somePassword");
```
