# deno_scripts

Type-safe centralized Deno project scripts 🦕

## Install

> You can change `dsc` to any name you prefer calling it

```sh
deno install -f -n dsc --allow-run --allow-read --allow-write https://deno.land/x/deno_scripts/cli.ts
```

## Features

- [x] Type-safety
- [x] Permissions management
- [x] Environment variables support (from `.env` or from _config_)
- [ ] [denon](https://github.com/eliassjogreen/denon) support (coming soon)

## Usage

First, you should init the configuration file, you can simply execute

> In the root of your project

```sh
dsc init
```

It will generate a `scripts.ts` file like so

```ts
import { Scripts } from "https://deno.land/x/deno_scripts/mod.ts";

Scripts({
  foo: {
    run: "echo dev",
  },
  bar: {
    file: "./mod.ts",
  },
});
```

As you could see, there are two different type of scripts, one is `file`, and the other is `run`.

Then you can simply use it

```sh
dsc foo
## or
dsc bar
## or you can simply call it using deno itself
deno run -A scripts.ts foo
```

### File script configuration

It will run the specified file as `deno run ...`

You can specify the configuration as it follows:

> | **Remember** | The **local** configuration will always have a priority over **global** configuration

```ts
interface ScriptFile {
  /**
   * File to be executed with "deno run ..."
   */
  file: string;
  /**
   * Load environment variables from a file
   *
   * If it's `true` it will look for ".env"
   *
   * By default it's set to `true` if a `.env` exists.
   */
  envFile?: boolean | string;
  /**
   * Add environment variables
   */
  env?: Record<string, string | number | boolean>;
  /**
   * Arguments to be added to the script
   */
  args?: string | string[];
  /**
   * Deno args to be added
   */
  denoArgs?: string | string[];
  /**
   * Permissions management
   */
  permissions?: {
    allowAll?: boolean;
    allowEnv?: boolean;
    allowHRTime?: boolean;
    allowNet?: boolean | string;
    allowPlugin?: boolean;
    allowRead?: boolean | string;
    allowRun?: boolean;
    allowWrite?: boolean | string;
  };
  /**
   * tsconfig location
   */
  tsconfig?: string;
}
```

### Run script configuration

It will run the specified command **as it is**.

You can specify the configuration as it follows:

> | **Remember** | The **local** configuration will always have a priority over **global** configuration

```ts
interface ScriptRun {
  /**
   * Command to be executed
   */
  run: string | string[];
  /**
   * Load environment variables from a file
   *
   * If it's `true` it will look for ".env"
   *
   * By default it's set to `true` if a `.env` exists.
   */
  envFile?: boolean | string;
  /**
   * Add environment variables
   */
  env?: Record<string, string | number | boolean>;
  /**
   * Arguments to be added after the script
   */
  args?: string | string[];
}
```

### Global configuration

You can also specify a second options object to the `Scripts` constructor.

> | **Remember** | The **local** configuration will always have a priority over **global** configuration

```ts
Scripts(
  {
    foo: {
      run: "echo dev",
    },
    bar: {
      file: "./mod.ts",
    },
  },
  {
    permissions: {
      allowRead: true,
    },
    tsconfig: "./tsconfig.json",
    preArgs: "",
    postArgs: "",
  }
);
```

You can specify the config as it follows

```ts
interface GlobalConfig {
  /**
   * Permissions management
   */
  permissions?: {
    allowAll?: boolean;
    allowEnv?: boolean;
    allowHRTime?: boolean;
    allowNet?: boolean | string;
    allowPlugin?: boolean;
    allowRead?: boolean | string;
    allowRun?: boolean;
    allowWrite?: boolean | string;
  };
  /**
   * tsconfig location
   */
  tsconfig?: string;
  /**
   * Deno args to be added
   */
  denoArgs?: string | string[];
  /**
   * Load environment variables from a file
   *
   * If it's `true` it will look for ".env"
   *
   * By default it's set to `true` if a `.env` exists.
   */
  envFile?: boolean | string;
  /**
   * Add environment variables
   */
  env?: Record<string, string | number | boolean>;
  /**
   * Arguments to be added after the script
   */
  args?: string | string[];
  /**
   * If `debug` is enabled, it will print the command
   * that is going to be executed.
   */
  debug?: boolean;
  /**
   * Import map path
   */
  importMap?: string;
  /**
   * Enable unstable features
   */
  unstable?: boolean;
}
```
