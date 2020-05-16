[![Actions](https://github.com/locize/i18next-locize-backend/workflows/node/badge.svg)](https://github.com/locize/i18next-locize-backend/actions?query=workflow%3Anode)
[![Travis](https://img.shields.io/travis/locize/i18next-locize-backend/master.svg?style=flat-square)](https://travis-ci.org/locize/i18next-locize-backend)
[![npm version](https://img.shields.io/npm/v/i18next-locize-backend.svg?style=flat-square)](https://www.npmjs.com/package/i18next-locize-backend)
[![David](https://img.shields.io/david/locize/i18next-locize-backend.svg?style=flat-square)](https://david-dm.org/locize/i18next-locize-backend)

This is an i18next backend to be used for [locize](http://locize.com) service. It will load resources from locize server using xhr.

It will allow you to save missing keys containing both **default value** and **context information** by calling:

```js
i18next.t(key, defaultValue, tDescription);
i18next.t(key, { defaultValue, tDescription });
```

# Troubleshooting

**SaveMissing is not working**

Per default only `localhost` is allowed to send them (to avoid you're using this feature accidentally in production. If you're not using `localhost` during development you will have to set the `allowedAddOrUpdateHosts: ['localhost']` for the [backend options](https://github.com/locize/i18next-locize-backend#backend-options).

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-locize-backend), bower or [downloaded](https://cdn.rawgit.com/locize/i18next-locize-backend/master/i18nextLocizeBackend.min.js) from this repo.

```
# npm package
$ npm install i18next-locize-backend

# bower
$ bower install i18next-locize-backend
```

Wiring up:

```js
import i18next from 'i18next';
import Locize from 'i18next-locize-backend';
// or
const i18next = require('i18next');
const Locize = require('i18next-locize-backend');

i18next.use(Locize).init(i18nextOptions);
```

for Deno:

```js
import i18next from 'https://deno.land/x/i18next/index.js'
import Backend from 'https://deno.land/x/i18next_locize_backend/index.js'

i18next.use(Backend).init(i18nextOptions);
```

- As with all modules you can either pass the constructor function (class) to the i18next.use or a concrete instance.
- If you don't use a module loader it will be added to `window.i18nextLocizeBackend`

## Backend Options

**IMPORTANT** make sure you do not add your apiKey in the production build to avoid misuse by strangers

```js
{
  // the id of your locize project
  projectId: '[PROJECTID]',

  // add an api key if you want to send missing keys
  apiKey: '[APIKEY]',

  // the reference language of your project
  referenceLng: '[LNG]',

  // version - defaults to latest
  version: '[VERSION]',

  // private - set to true if you version on locize is set to use private publish
  private: false,

  // hostnames that are allowed to create, update keys
  // please keep those to your local system, staging, test servers (not production)
  // can be array of allowed hosts or a function (hostname) => { return true; // or false if not allowed }
  allowedAddOrUpdateHosts: ['localhost'],

  // optional event triggered on saved to backend
  onSaved: (lng, ns) => { ... }
}
```

To load translations only `projectId` needs to be filled. To use the **saveMissing** feature of i18next additional to the projectId both `apiKey` and `referenceLng` have to be set.

Options can be passed in:

**preferred** - by setting options.backend in i18next.init:

```js
import i18next from "i18next";
import Locize from "i18next-locize-backend";

i18next.use(Locize).init({
  backend: options
});
```

on construction:

```js
import Locize from "i18next-locize-backend";
const locize = new Locize(options);
```

via calling init:

```js
import Locize from "i18next-locize-backend";
const locize = new Locize();
locize.init(options);
```

## Additional API endpoints

### backend.getLanguages

Will return a list of all languages in your project including percentage of translations done per version.

```js
import Locize from "i18next-locize-backend";
const locize = new Locize(options);

locize.getLanguages((err, data) => {
  /*
  data is:

  {
    "en": {
      "name": "English",
      "nativeName": "English",
      "isReferenceLanguage": true,
      "translated": {
        "latest": 1
      }
    },
    "de": {
      "name": "German",
      "nativeName": "Deutsch",
      "isReferenceLanguage": false,
      "translated": {
        "latest": 0.9
      }
    }
  }
  */
});

// or
i18next.services.backendConnector.backend.getLanguages(callback);
```

### backend.getOptions

Will return an object containing useful informations for the i18next init options.

```js
import Locize from "i18next-locize-backend";
const locize = new Locize(options);

locize.getOptions((err, data) => {
  /*
  data is:

  {
    fallbackLng: 'en',
    referenceLng: 'en',
    whitelist: ['en', 'de'],
    load: 'languageOnly|all' // depending on your whitelist has locals having region like en-US
  }
  */
});

// or
i18next.services.backendConnector.backend.getOptions(callback);
```

You can set a threshold for languages to be added to whitelist by setting whitelistThreshold in backend options (eg: 1 = 100% translated, 0.9 = 90% translated).

## SPECIAL - let the backend determine some options to improve loading

You can load some information from the backend to eg. set whitelist for i18next just supporting languages you got in your locize project.

You will get i18next options for (same as above backend.getOptions):

- fallbackLng
- whitelist
- load

```js
import i18next from "i18next";
import Locize from "i18next-locize-backend";

const locize = new Locize(
  {
    projectId: "[PROJECTID]",
    apiKey: "[APIKEY]",
    version: "[VERSION]"
    // referenceLng -> not needed as will be loaded from API
  },
  (err, opts) => {
    i18next.use(locize).init({ ...opts, ...yourOptions }); // yourOptions should not include backendOptions!
  }
);
```

## IMPORTANT ADVICE FOR SERVERLESS environments - AWS lambda, Google Cloud Functions, Azure Functions, etc...

<font color="red">
  <b>Please be aware</b>
</font>

Due to how serverless functions work, you cannot guarantee that a cached version of your data is available. Serverless functions are short-lived, and can shut down at any time, purging any in-memory or filesystem cache. This may be an acceptable trade-off, but sometimes it isn't acceptable.

**Because of this we suggest to download the translations in your CI/CD pipeline (via [cli](https://github.com/locize/locize-cli#download-current-published-files) or via [api](https://docs.locize.com/integration/api#list-all-namespace-resources)) and package them with your serverless function.**

### For example with [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend)

```js
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

const backend = new Backend({
  // path where resources get loaded from
  loadPath: '/locales/{{lng}}/{{ns}}.json'
});

i18next
  .use(backend)
  .init({
    // initImmediate: false, // setting initImediate to false, will load the resources synchronously
    ...opts,
    ...yourOptions
  }); // yourOptions should not include backendOptions!
```

### or just [import/require](https://www.i18next.com/how-to/add-or-load-translations#add-on-init) your files directly

```js
import i18next from 'i18next';
import en from './locales/en.json'
import de from './locales/de.json'

i18next
  .init({
    ...opts,
    ...yourOptions,
    resources: {
      en,
      de
    }
  });
```
