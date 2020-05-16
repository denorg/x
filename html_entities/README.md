# deno_html_entities

> Fast html entities decode & encode library for Deno.

This library is [mdevils/node-html-entities](https://github.com/mdevils/node-html-entities) with ES Modules syntax.

## Usage
Supports 4 methods for each module (Html5Entities, XmlEntities, Html4Entities):

* encode — encodes, replacing characters to its entity representations. Ignores UTF characters with no entity representation.
* encodeNonUTF — encodes, replacing characters to its entity representations. Inserts numeric entities for UTF characters.
* encodeNonASCII — encodes, replacing only non-ASCII characters to its numeric entity representations.
* decode — decodes, replacing entities to characters. Unknown entities are left as is.

**All HTML entities encoding/decoding**

```javascript
import { Html5Entities } from "https://deno.land/x/html_entities@v1.0/mod.js";

Html5Entities.encode('<>"&©®∆'); // &lt;&gt;&quot;&amp;&copy;&reg;∆
Html5Entities.encodeNonUTF('<>"&©®∆'); // &lt;&gt;&quot;&amp;&copy;&reg;&#8710;
Html5Entities.encodeNonASCII('<>"&©®∆'); // <>"&©®&#8710;
Html5Entities.decode('&lt;&gt;&quot;&amp;&copy;&reg;'); // <>"&©®
```

**XML entities**

HTML validity and XSS attack prevention you can achieve from XmlEntities module.

```js
import { XmlEntities } from "https://deno.land/x/html_entities@v1.0/mod.js";

XmlEntities.encode('<>"\'&©®'); // &lt;&gt;&quot;&apos;&amp;©®
XmlEntities.encodeNonUTF('<>"\'&©®'); // &lt;&gt;&quot;&apos;&amp;&#169;&#174;
XmlEntities.encodeNonASCII('<>"\'&©®'); // <>"\'&©®
XmlEntities.decode('&lt;&gt;&quot;&apos;&amp;&copy;&reg;&#8710;'); // <>"'&&copy;&reg;∆
```

## Tests
```sh
$ deno test mod_test.js
```

## License

MIT
