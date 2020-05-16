### 4.0.8

- fix exports for react-native

### 4.0.7

- dedicated export for node v14

### 4.0.6

- check for logger to exist

### 4.0.5

- fix checkIfProjectExists callback

### 4.0.4

- fix for react-native

### 4.0.3

- warning for using saveMissing or updateMissing feature on a host not beeing localhost

### 4.0.2

- fix for bundlers like rollup

### 4.0.0

- complete refactoring to make this module universal (replaces i18next-node-locize-backend)

### 3.1.3

- page missing request

### 3.1.2

- make sure checkIfProjectExists is not called, while waiting for response

### 3.1.1

- fix for non-browser usage

### 3.1.0

- check if project exists

### 3.0.3

- retry on 400 status

### 3.0.2

- retry on 408 status

### 3.0.1

- fix allowedAddOrUpdateHosts function failure log [317](https://github.com/locize/i18next-locize-backend/pull/317)

### 3.0.0

- using the new `locize.app` domain replacing the deprecated `locize.io` domain
- removed the deprecated pull API keeping a warning to use `private` option instead
- updated dev dependencies

### 2.2.2

- warn for missing options

### 2.2.1

- check for window type [312](https://github.com/locize/i18next-locize-backend/pull/312)

### 2.2.0

- allow `allowedAddOrUpdateHosts` to be a function returning true if allowed or false if not allowed host

### 2.1.0

- emit a onSaved(lng, ns) event if in options

### 2.0.2

- small fixes in warn logic

### 2.0.1

- give warnings when save missing does block the saving because reference language was not found or the allowed hosts did not contain the host

### 2.0.0

- removes deprecated jsnext:main from package.json
- Bundle all entry points with rollup [303](https://github.com/locize/i18next-locize-backend/pull/303)
- **note:** dist/es -> dist/esm, dist/commonjs -> dist/cjs (individual files -> one bundled file)
- removes bower finally

### v1.9.0

- allow to define a list of allowed hosts to send lastUsed data - defaults to localhost

### v1.8.0

- handle empty result as an error if `failLoadingOnEmptyJSON` set true [299](https://github.com/locize/i18next-locize-backend/pull/299)

### v1.7.1

- main export index.d.ts as default export

### v1.7.0

- adds index.d.ts for typescript users

### v1.6.0

- support for private versions

### v1.5.0

- experimental option to use pull api route during development

### v1.4.2

- fix typo in package.json

### v1.4.1

- fix getLanguages route to return error on not getting data

### v1.4.0

- adds getOptions route
- add special construction with callback to autoload possible i18next options.

### v1.3.1

- fixes debounced write to send every namespace-language pair

### v1.3.0

- supports submitting options tDescription (context) i18next >= 10.4.1

### v1.2.1

- use content-type in case of POST request

### v1.2.0

- make the content-type optional using option.setContentTypeJSON

### v1.1.0

- adds update function
- adds compatibility to i18next options updateMissing

### v1.0.0

- adds module entry point for webpack2
- updates all it's build dependencies
- optimize rollbar build to use es2015 transpile
