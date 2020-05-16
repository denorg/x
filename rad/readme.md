# rad 💯

a general purpose build tool.

statically typed, batteries included. command tasks, function tasks, and make-style tasks supported.

| branch | status |
| ------ | ------------ |
| master | [![master](https://github.com/cdaringe/rad/workflows/master/badge.svg)](https://github.com/cdaringe/rad/actions?query=workflow%3Amaster) |
| next   | [![next](https://github.com/cdaringe/rad/workflows/next/badge.svg?branch=next)](https://github.com/cdaringe/rad/actions?query=workflow%3Anext) |

jump to:

1. [documentation site](https://cdaringe.github.io/rad/) <!--NOSITE-->
2. [usage](#usage)
3. [install](#install)
4. [what](#what-is-it)
5. [why not `<my-favorite-build-tool>`?](https://cdaringe.github.io/rad/#why-not-my-favorite-build-tool)
6. [manual](https://cdaringe.github.io/rad/#manual)

## usage

`$ rad <task-name> [--help]`

```ts
// rad.ts
import { Tasks } from "https://deno.land/x/rad/src/mod.ts";

// command tasks
const format = `prettier --write`
const test = `deno test`

// function tasks
const compile = {
  dependsOn: [format],
  fn({ sh, ...toolkit }) => sh('tsc')
}

// make-style tasks
const transpile = {
  target: "phony",
  prereqs: ["p1", "p2"],
  async onMake({ logger }, { changedPrereqs /*, prereqs */}) {
    for await (const req of changedPrereqs) {
      logger.info(`req: ${req.filename} ${JSON.stringify(req.info)}`);
    }
  },
}

export const tasks: Tasks = {
  compile,
  format,
  test
}
```

## install

there are a few formal ways to use `rad`. regardless of the route you choose,
know that all strategies support using pinned versions, adherent to semver.
see the [releases page](https://github.com/cdaringe/rad/releases).

| usage | install-method | install-steps |
| -- | -- | -- |
| cli | `deno` | `deno install -A -n rad https://raw.githubusercontent.com/cdaringe/rad/master/src/bin.ts`<br />`deno install -A -n rad https://raw.githubusercontent.com/cdaringe/rad/next/src/bin.ts` |
| cli | `docker` | `docker pull cdaringe/rad` <sup>1</sup>|
| cli | `curl` | <code>curl -fsSL https://github.com/cdaringe/rad/releases/download/v1.2.0/install.sh \| sh</code> (versioned)<br /><code>curl -fsSL https://raw.githubusercontent.com/cdaringe/rad/master/assets/install.sh \| sh</code> (latest) |
| library | `deno` | `import * as rad from https://github.com/cdaringe/rad/blob/master/src/mod.ts` |


<sup>1</sup>For docker users, consider making a nice shell alias

```bash
# shell profile, e.g. .bash_profile
function rad() {
  docker run --rm -v $PWD:/rad cdaringe/rad "$@";
}
```

## what is it

a build tool! it competes with make, npm-scripts, bazel, gradle, ant, gulp, or any of the
other many tools out there!

`rad` offers:

- simple, programmable task interfaces
- easy to understand, declarative build steps
- type-checked tasks
- productive toolkit API for nuanced tasks that benefit from progamming. see [toolkit](#toolkit)<!-- @todo write toolkit docs-->
- bottom-up, `make`-style build targets
  - fast builds, skip redundant work when inputs haven't changed
- cli mode, or library mode
- portability. build automation for _any_ language or project, in many environments (*limited to _Deno_ target architectures, for the time being. long term, we may package this in `Rust`)
- great UX
- no quirky DSLs (`make`, `gradle`, and friends 😢). **your build is code**--tasks are typescript & are indeed type-checked!
- debuggability. 🐛 inspect your data, tasks, or even _rad_ itself
- a real scripting language--**not** `bash/sh`! shell languages are great for running other programs, not for plumbing data

see [why not `<my-favorite-build-tool>`?](https://cdaringe.github.io/rad/#why-not-my-favorite-build-tool)
