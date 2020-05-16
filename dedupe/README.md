Ported from https://github.com/seriousManual/dedupe

# dedupe
[![Build Status](https://travis-ci.org/Sab94/dedupe.svg?branch=master)](https://travis-ci.org/Sab94/dedupe)

removes duplicates from your array.

## Usage

### primitive types
```typescript
import { dedupe } from 'https://raw.githubusercontent.com/Sab94/dedupe/master/mod.ts'

var a = [1, 2, 2, 3]
var b = dedupe(a)
console.log(b)

//result: [1, 2, 3]
```

### complex types
Here the string representation of the object is used for comparism. The mechanism is similar to JSON.stringifing but a bit more efficient.
That means that `{}` is considered egal to `{}`. 
```javascript
import { dedupe } from 'https://github.com/Sab94/dedupe/blob/master/mod.ts'

var aa = [{a: 2}, {a: 1}, {a: 1}, {a: 1}]
var bb = dedupe(aa)
console.log(bb)

//result: [{a: 2}, {a: 1}]
```

### complex types types with custom hasher
```javascript
import { dedupe } from 'https://github.com/Sab94/dedupe/blob/master/mod.ts'

var aaa = [{a: 2, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}]
var bbb = dedupe(aaa, value => value.a)
console.log(bbb)

//result: [{a: 2, b: 1}, {a: 1,b: 2}]
```
