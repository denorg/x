# Panoptes

> A simple array and object watcher function for Deno.

[![DenoLib](https://denolib.com/badge?scope=tokenchingy&repo=panoptes)](https://denolib.com)
[![Build Status](https://travis-ci.com/TokenChingy/panoptes.svg?branch=master)](https://travis-ci.com/TokenChingy/panoptes)

## Table of Contents

- [Panoptes](#panoptes)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [API](#api)
    - [`watch()`](#watch)
      - [`object: Object`](#object-object)
      - [`callback: Function<void>`](#callback-functionvoid)
      - [`options?: Object`](#options-object)
        - [`callbackOnGet`](#callbackonget)

## Usage

```ts
import { watch } from 'https://deno.land/x/panoptes/mod.ts';
```

A simple example of how to use Panoptes's `watch()`.

```ts
import { watch } from 'https://deno.land/x/panoptes/mod.ts';

// Example interface for the base object.
interface BaseObjectStruct {
  a: String;
  b: {
    c: Array<String>;
  };
  e: Number;
}

// The base object that will be watched.
const baseObject: BaseObjectStruct = {
  a: 'a',
  b: {
    c: ['d'],
  },
  e: 1,
};

// The new reference object that is being watched.
const watchedObject: any = watch(
  baseObject,
  () => {
    console.log('Something happened!');
  },
  {
    callbackOnGet: false,
  },
);

// The watch callback should fire for each execution below.
watchedObject.a = 'b';
watchedObject.b.c.push('e'); // Array methods will fire the callback multiple times.
delete watchedObject.e;

//> Something happened!
//> Something happened!
//> Something happened!
//> Something happened!
```

## API

### `watch()`

```ts
watch(object: Object, callback: Function, options?: OptionsStruct);
```

#### `object: Object`

The base object in which you would like watched.

#### `callback: Function<void>`

The callback that will be fired on change. Function should not return.

#### `options?: Object`

The options object passed into the `watch()` function. This is optional and implements the interface `OptionsStruct`.

```ts
interface OptionsStruct {
  callbackOnGet: Boolean;
}
```

##### `callbackOnGet`

Setting this to `true` will enable the watcher to fire the callback function on get operations. Not setting it will disable this feature.
