Deno ende library
=
Text encoder and decoder exported as simple functions.

To be able to write quickly:
```ts
Deno.stdout.write(encode('abc'));
```
instead of a common idiom:
```ts
Deno.stdout.write(new TextEncoder().encode('abc'));
```
with no need to create new encoders/decoders everywhere
(those are crated once and reused).

Usage
-

Shorter version:

```ts
import { en, de } from 'https://deno.land/x/ende/mod.ts';

const buffer: Uint8Array = en('abc');
const text: string = de(buffer);
```

More readable version:

```ts
import { encode, decode } from 'https://deno.land/x/ende/mod.ts';

const buffer: Uint8Array = encode('abc');
const text: string = decode(buffer);
```

Exported functions
-

Encoder function aliases:

- `en(x: string): Uint8Array`
- `enc(x: string): Uint8Array`
- `encode(x: string): Uint8Array`

Decoder function aliases:

- `de(x: Uint8Array): string`
- `dec(x: Uint8Array): string`
- `decode(x: Uint8Array): string`

Issues
-
For any bug reports or feature requests please
[post an issue on GitHub][issues-url].

Author
-
[**Rafał Pocztarski**](https://pocztarski.com/)
<br/>
[![Follow on GitHub][github-follow-img]][github-follow-url]
[![Follow on Twitter][twitter-follow-img]][twitter-follow-url]
<br/>
[![Follow on Stack Exchange][stackexchange-img]][stackoverflow-url]

License
-
MIT License (Expat). See [LICENSE.md](LICENSE.md) for details.

[github-url]: https://github.com/rsp/deno-ende
[readme-url]: https://github.com/rsp/deno-ende#readme
[issues-url]: https://github.com/rsp/deno-ende/issues
[license-url]: https://github.com/rsp/deno-ende/blob/master/LICENSE.md
[travis-url]: https://travis-ci.org/rsp/deno-ende
[travis-img]: https://travis-ci.org/rsp/deno-ende.svg?branch=master
[snyk-url]: https://snyk.io/test/github/rsp/deno-ende
[snyk-img]: https://snyk.io/test/github/rsp/deno-ende/badge.svg
[david-url]: https://david-dm.org/rsp/deno-ende
[david-img]: https://david-dm.org/rsp/deno-ende/status.svg
[install-img]: https://nodei.co/npm/ende.png?compact=true
[downloads-img]: https://img.shields.io/npm/dt/ende.svg
[license-img]: https://img.shields.io/npm/l/ende.svg
[stats-url]: http://npm-stat.com/charts.html?package=ende
[github-follow-url]: https://github.com/rsp
[github-follow-img]: https://img.shields.io/github/followers/rsp.svg?style=social&logo=github&label=Follow
[twitter-follow-url]: https://twitter.com/intent/follow?screen_name=pocztarski
[twitter-follow-img]: https://img.shields.io/twitter/follow/pocztarski.svg?style=social&logo=twitter&label=Follow
[stackoverflow-url]: https://stackoverflow.com/users/613198/rsp
[stackexchange-url]: https://stackexchange.com/users/303952/rsp
[stackexchange-img]: https://stackexchange.com/users/flair/303952.png
