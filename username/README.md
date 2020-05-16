# deno-username

[![tag](https://img.shields.io/github/release/justjavac/deno-username)](https://github.com/justjavac/deno-username/releases)
[![Build Status](https://github.com/justjavac/deno-username/workflows/ci/badge.svg?branch=master)](https://github.com/justjavac/deno-username/actions)
[![license](https://img.shields.io/github/license/justjavac/deno-username)](https://github.com/justjavac/deno-username/blob/master/LICENSE)
[![](https://img.shields.io/badge/deno-v0.40.0-green.svg)](https://github.com/denoland/deno)

> Get the username of the current user

This module is meant for informational purposes and not for secure identification.

**Requires the `--allow-env` and `--allow-run` flags**.

## Usage

```js
import { username } from "https://deno.land/x/username/mod.ts";

await username();
// ---> 'justjavac'
```

## API

It first tries to get the username from the `SUDO_USER` `LOGNAME` `USER` `LNAME` `USERNAME` environment variables.
Then falls back to `$ id -un` on macOS / Linux and `$ whoami` on Windows, in the rare case none of the environment variables are set.

### username()

Returns a `Promise<string | undefined>` with the username.

## Thanks

Heavily inspired by [sindresorhus/usernameh](https://github.com/sindresorhus/username).
