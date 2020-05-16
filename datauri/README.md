# 🦕 datauri
Deno module to generate [Data URI scheme](http://en.wikipedia.org/wiki/Data_URI_scheme).

![.github/workflows/deno.yml](https://github.com/data-uri/datauri-deno/workflows/.github/workflows/deno.yml/badge.svg)

>  The data URI scheme is a uniform resource identifier (URI) scheme that provides a way to include data in-line in web pages as if they were external resources.

from: [Wikipedia](http://en.wikipedia.org/wiki/Data_URI_scheme)

## Usage

```typescript
import { datauri } from "https://deno.land/x/datauri/mod.ts";

const helloWorld = await datauri("assets/image.gif");
console.log(helloWorld); // data:image/gif,base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7
```

## License

MIT License

(c) [Data-URI.js](https://github.com/data-uri)

(c) [Helder Santana](https://heldr.com)
