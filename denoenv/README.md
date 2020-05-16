# denv
A module similar to [dotenv](https://github.com/motdotla/dotenv), but for Deno

## Usage
You can directly import it, and it will use the `.env` file of the directory it is imported in

It supports all the config options of original dotenv module



## Config

`config` will read your `.env` file, parse the contents, assign it to
[`Deno.env`],
and return an Object with a `parsed` key containing the loaded content or an `error` key if it failed.

```js
const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)
```

You can additionally, pass options to `config`.

### Options

#### Path

Default: path.resolve(Deno.cwd(), '.env')

You may specify a custom path if your file containing environment variables is located elsewhere.

```ts
dotenv.config({ path: '/custom/path/to/.env' })
```

#### Encoding

Default: `utf8`

You may specify the encoding of your file containing environment variables.

```ts
dotenv.config({ encoding: 'latin1' })
```

#### Debug

Default: `false`

You may turn on logging to help debug why certain keys or values are not being set as you expect.


```ts
dotenv.config({ debug: false })
```

#### SetEnv

Default: `true`

Set to true to export all .env variables to the current processes environment. Variables are then accessable via deno's env function.


```ts
dotenv.config({ setEnv: true })
```
