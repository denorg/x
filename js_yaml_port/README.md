# Simple JS-YAML port for Deno

This is a simple and crude port of [JS-YAML](https://github.com/nodeca/js-yaml) for [Deno](https://deno.land).

## Usage

Just import `js-yaml.js` file. For example:

```typescript
import { load } from 'https://deno.land/x/js_yaml_port/js-yaml.js'
console.log(load('hello: world')) // => prints { hello: "world" }
```

## API References

Just use [JS-YAML repo](https://github.com/nodeca/js-yaml#api) for references.

## Development

### Required tools

* [`node`](https://nodejs.org) to run package manager.
* [`pnpm`](https://pnpm.js.org) to install npm packages.
* [`deno`](https://deno.land) to build and test.
* `cp`.
* `make`.

### Build and Test

#### Build

```sh
make js-yaml.js
```

#### Test

```sh
make test
```

## License

[MIT](https://git.io/JvdHV) © [Hoàng Văn Khải](https://github.com/KSXGitHub/)
