deno caught
===========

This module lets you attach empty rejcetion handlers to promises
to avoid errors when we want to handle rejections asynchronously.

It is a port of `caught` for Node, see: https://github.com/rsp/node-caught

More info
-
Doing something like this:

```js
const p = Promise.reject(0);

setTimeout(() => p.catch(e => console.error('caught')), 0);
```

will result in the program terminating with an error:

```
error: Uncaught 0
```

This module lets you write:

```js
const p = caught(Promise.reject(0));

setTimeout(() => p.catch(e => console.error('caught')), 0);
```

to avoid those errors on a per-promise basis.

Use at your own risk.

Background
-
For more info see this answer on Stack Overflow:

* [**Should I refrain from handling Promise rejection asynchronously?**](https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously/40921505#40921505)


Usage
-----
```ts
import { caught } from 'https://deno.land/x/caught/mod.ts';

const p = caught(Promise.reject(0));
```

Note that it is not the same as writing:

```js
const p = Promise.reject(0).catch(() => {});
```

which would not return the original promise and wouldn't let you add `catch` handlers later.

Issues
------
For any bug reports or feature requests please
[post an issue on GitHub][issues-url].

Author
------
[**Rafał Pocztarski**](https://pocztarski.com/)
<br/>
[![Follow on GitHub][github-follow-img]][github-follow-url]
[![Follow on Twitter][twitter-follow-img]][twitter-follow-url]
<br/>
[![Follow on Stack Exchange][stackexchange-img]][stackoverflow-url]

Contributors
------------
* [Wil Lee](https://github.com/kourge) ([added TypeScript support](https://github.com/rsp/node-caught/pull/1) in the original [caught](https://github.com/rsp/node-caught) for Node)

License
-------
MIT License (Expat). See [LICENSE.md](LICENSE.md) for details.

[github-url]: https://github.com/rsp/deno-caught
[readme-url]: https://github.com/rsp/deno-caught#readme
[issues-url]: https://github.com/rsp/deno-caught/issues
[license-url]: https://github.com/rsp/deno-caught/blob/master/LICENSE.md
[travis-url]: https://travis-ci.org/rsp/deno-caught
[travis-img]: https://travis-ci.org/rsp/deno-caught.svg?branch=master
[snyk-url]: https://snyk.io/test/github/rsp/deno-caught
[snyk-img]: https://snyk.io/test/github/rsp/deno-caught/badge.svg
[david-url]: https://david-dm.org/rsp/deno-caught
[david-img]: https://david-dm.org/rsp/deno-caught/status.svg
[install-img]: https://nodei.co/npm/caught.png?compact=true
[downloads-img]: https://img.shields.io/npm/dt/caught.svg
[license-img]: https://img.shields.io/npm/l/caught.svg
[stats-url]: http://npm-stat.com/charts.html?package=caught
[github-follow-url]: https://github.com/rsp
[github-follow-img]: https://img.shields.io/github/followers/rsp.svg?style=social&logo=github&label=Follow
[twitter-follow-url]: https://twitter.com/intent/follow?screen_name=pocztarski
[twitter-follow-img]: https://img.shields.io/twitter/follow/pocztarski.svg?style=social&logo=twitter&label=Follow
[stackoverflow-url]: https://stackoverflow.com/users/613198/rsp
[stackexchange-url]: https://stackexchange.com/users/303952/rsp
[stackexchange-img]: https://stackexchange.com/users/flair/303952.png
