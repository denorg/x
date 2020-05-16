# is_exe

A port of the [https://github.com/isaacs/isexe](https://github.com/isaacs/isexe) package for Deno

## Usage

```sh
deno run --allow-read --allow-env main.ts
```

```js
// main.ts
import { isExecutable } from 'https://raw.githubusercontent.com/eankeen/is_exe/master/mod.ts'

try {
  const isExe = await isExecutable('./file')
  isExe || console.log('file is executable')
} catch {
  console.log('error reading file')
}
```

## API

### `isExecutable(filePath, [options])`

### Options

- `ignoreErrors` treat all errors as "no, this is not executable", but don't raise them.
- `uid` number to use as the user id
- `gid` number to use as the group id
- `pathExt` list of path extensions to use instead of PATHEXT environment variable on Windows *(not implemented)*
