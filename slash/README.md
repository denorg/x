# deno-slash

[![tag](https://img.shields.io/github/release/justjavac/deno-slash)](https://github.com/justjavac/deno-slash/releases)
[![Build Status](https://github.com/justjavac/deno-slash/workflows/ci/badge.svg?branch=master)](https://github.com/justjavac/deno-slash/actions)
[![license](https://img.shields.io/github/license/justjavac/deno-slash)](https://github.com/justjavac/deno-slash/blob/master/LICENSE)
[![](https://img.shields.io/badge/deno-v0.40.0-green.svg)](https://github.com/denoland/deno)

> Convert Windows backslash paths to slash paths: `foo\\bar` ➔ `foo/bar`

[Forward-slash paths can be used in Windows](http://superuser.com/a/176395/6877) as long as they're not extended-length paths and don't contain any non-ascii characters.

This was created since the `path` methods in Node.js outputs `\\` paths on Windows.

## Usage

```js
import { slash } from "https://deno.land/x/slash/mod.ts";

slash("foo\\bar");
// Unix    => foo/bar
// Windows => foo/bar
```

## API

### slash(path)

Type: `string`

Accepts a Windows backslash path and returns a path with forward slashes.

## Thanks

Heavily inspired by [sindresorhus/slashh](https://github.com/sindresorhus/slash).
