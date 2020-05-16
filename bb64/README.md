# BB64 (Better Base64)

BB64 is a an easy to use, unicode supported base64 encoding interface for both JavaScript and TypeScript that let's you:

	* Encode/Decode strings to base64 strings
	* Encode/Decode Uint8Arrays to base64 strings
	* Encode/Decode files to base64 strings, including adding on the appropriate MIME types
	* Encode/Decode files to base64 and writing the contents to a file, including adding on the appropriate MIME types


## Usage

To use BB64, import the library from this repository, and use a **from** and **to** function to convert a string, Uint8Array, or file to base64 encoding. For example, to encode a string to base64:

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromString("hello world").toString();
```

will return the following base64 encoded string:

```typescript
aGVsbG8gd29ybGQ=
```

and then to unencode a base64 string:

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromBase64String("aGVsbG8gd29ybGQ=").toString();
```

will return the following base64 decoded string:

```typescript
hello world
```


## Documentation

## Encoding

### Encode string to base64 encoded string

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromString("hello world").toString();

// Will return "aGVsbG8gd29ybGQ="
```

Unicode strings are also supported by bb64:

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromString("Адамска").toString();

// Will return "0JDQtNCw0LzRgdC60LA="


Base64.fromString("ジャック").toString();

// Will return "44K444Oj44OD44Kv"
```


### Encode Uint8Array to base64 encoded string

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

// Converting a string to a Uint8Array
let strArray = "hello world".split("");
let charArray = strArray.map(c => c.charCodeAt());
let uint8arr = new Uint8Array(charArray);

// Encoding the Uint8Array to a base64 string
Base64.fromUint8Array(uint8arr).toString();

// Will return "aGVsbG8gd29ybGQ="
```


### Encode file to base64 encoded string

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

// In this case, the file contains the text "hello world" and a newline character
Base64.fromFile("hello.txt").toString();

// Will return "aGVsbG8gd29ybGQK"
```


### Encode file to base64 encoded string including the MIME type from file extension

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromFile("image.png").toStringWithMime();

// Will return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
// Note that MIME type has been determined based on the file extension
```


### Encode file to base64 encoding and writing the encoded contents to a file

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromFile("image.png").toFile("image.base64.png");

// Will write to the "image.base64.png" file the base64 encoded contents "iVBORw0KGgoAAAANSUhEUgAA..."
// Note the MIME type will not be included when using this method
```


### Encode file to base64 encoding and writing the encoded contents to a file including the MIME type from the file extension

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromFile("image.png").toFileWithMime("image.png.base64");

// Will write to the "image.base64.png" file the base64 encoded contents "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
// Note that MIME type has been determined based on the file extension
```


## Decoding

### Decode base64 string to string

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromBase64String("aGVsbG8gd29ybGQ=").toString();

// Will return "hello world"
```


### Decode base64 Uint8Array to string

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

// Converting a string to a Uint8Array
let strArray = "aGVsbG8gd29ybGQ=".split("");
let charArray = strArray.map(c => c.charCodeAt());
let b64uint8arr = new Uint8Array(charArray);

// Encoding the Uint8Array to a base64 string
Base64.fromBase64Uint8Array(b64uint8arr).toString();

// Will return "hello world"
```


### Decode file to base64 encoded string

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

// In this case, the file contains the base64 encoded text "aGVsbG8gd29ybGQK"
Base64.fromBase64File("hello.txt.base64").toString();

// Will return "hello world"
```


### Decode base64 encoded file and writing the unencoded contents to a file

```typescript
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

Base64.fromBase64File("image.png.base64").toFile("image.png");

// Will read the file "image.png.base64" and base64 decode and write the contents
// to the file "image.png". Note that if "image.png.base64" contained a MIME type,
// this function will remove it when writing the decoded contents to disk
```


