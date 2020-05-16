[![Build Status](https://travis-ci.com/petruki/skimming.svg?branch=master)](https://travis-ci.com/github/petruki/skimming)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# `skimming`

Skimming is a data fetcher for Deno. The idea is to provide a simple and efficient module to fetch content.

 - Fetch documents online `skim()` or local `skimContent()`
 - Customizable cache
 - Customizable preview
 - Ignore case option
 - Trim content option to display only complete information
 - Regex support

# Usage

### No cache
```js
import Skimming from "../mod.ts";

const files = ["installation.md", "skimming.md", "README.md"];
const context: Context = { url: "https://raw.githubusercontent.com/petruki/skimming/master/", files };

const skimmer = new Skimming();
skimmer.setContext(context);
const results = await skimmer.skim(query, { previewLength: 200 });
```
- Where `previewLength` is the number of characters after the found occurrence which will be displayed (default: 200)
- Add `ignoreCase` option for whether ignore case or not (default: false)

### Using cache
```js
import Skimming from "../mod.ts";

const files = ["installation.md", "skimming.md", "README.md"];
const context: Context = { url: "https://raw.githubusercontent.com/petruki/skimming/master/", files };

const skimmer = new Skimming({ expireDuration: 10, size: 10 });
skimmer.setContext(context);
const results = await skimmer.skim(query, { previewLength: 200 });
```
- Where `expireDuration` the time in seconds that the cached value will expire (default: 1min)
- Where `size` is the number of stored queries and its results in cache (default: 60)

### Testing
Use `deno test --allow-net` to test mod_test.ts

## Contributing
Please do open an issue or PR if you feel you have something cool to add.