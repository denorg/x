import { assertEquals, assertNotEquals } from 'https://deno.land/std/testing/asserts.ts'
import { readFileStrSync } from 'https://deno.land/std/fs/read_file_str.ts'
import { resolve } from 'https://deno.land/std/path/mod.ts'
import { EOL } from 'https://deno.land/std/path/constants.ts'

import * as i from '../ini.ts'
const { test } = Deno
const data = readFileStrSync(resolve('./test/fixtures/foo.ini'), { encoding: 'utf-8' })

let d = undefined
const expectE = `o=p${EOL}`
            + `a with spaces=b  c${EOL}`
            + `" xa  n          p "="\\"\\r\\nyoyoyo\\r\\r\\n"${EOL}`
            + `"[disturbing]"=hey you never know${EOL}`
            + `s=something${EOL}`
            + `s1=\"something\'${EOL}`
            + `s2=something else${EOL}`
            + `zr[]=deedee${EOL}`
            + `ar[]=one${EOL}`
            + `ar[]=three${EOL}`
            + `ar[]=this is included${EOL}`
            + `br=warm${EOL}`
            + `eq=\"eq=eq\"${EOL}`
            + `${EOL}`
            + `[a]${EOL}`
            + `av=a val${EOL}`
            + `e={ o: p, a: `
            + `{ av: a val, b: { c: { e: "this [value]" `
            + `} } } }${EOL}j="\\"{ o: \\"p\\", a: { av:`
            + ` \\"a val\\", b: { c: { e: \\"this [value]`
            + `\\" } } } }\\""${EOL}"[]"=a square?${EOL}`
            + `cr[]=four${EOL}cr[]=eight${EOL}${EOL}`
            + `[a.b.c]${EOL}e=1${EOL}`
            + `j=2${EOL}${EOL}[x\\.y\\.z]${EOL}x.y.z=xyz${EOL}${EOL}`
            + `[x\\.y\\.z.a\\.b\\.c]${EOL}a.b.c=abc${EOL}`
            + `nocomment=this\\; this is not a comment${EOL}`
            + `noHashComment=this\\# this is not a comment${EOL}`
  , expectD =
    { o: 'p',
      'a with spaces': 'b  c',
      " xa  n          p ":'"\r\nyoyoyo\r\r\n',
      '[disturbing]': 'hey you never know',
      's': 'something',
      's1' : '\"something\'',
      's2': 'something else',
      'zr': ['deedee'],
      'ar': ['one', 'three', 'this is included'],
      'br': 'warm',
      'eq': 'eq=eq',
      a:
       { av: 'a val',
         e: '{ o: p, a: { av: a val, b: { c: { e: "this [value]" } } } }',
         j: '"{ o: "p", a: { av: "a val", b: { c: { e: "this [value]" } } } }"',
         "[]": "a square?",
         cr: ['four', 'eight'],
         b: { c: { e: 1, j: 2 } } },
      'x.y.z': {
        'x.y.z': 'xyz',
        'a.b.c': {
          'a.b.c': 'abc',
          'nocomment': 'this\; this is not a comment',
          noHashComment: 'this\# this is not a comment'
        }
      }
    }
  , expectF = `[prefix.log]${EOL}`
            + `type=file${EOL}${EOL}`
            + `[prefix.log.level]${EOL}`
            + `label=debug${EOL}`
            + `value=10${EOL}`
  , expectG = `[log]${EOL}`
            + `type = file${EOL}${EOL}`
            + `[log.level]${EOL}`
            + `label = debug${EOL}`
            + `value = 10${EOL}`

test(function decodeFromFile() {
  var d = i.decode(data)
  assertEquals(d, expectD)
})

test(function encodeFromData() {
  var e = i.encode(expectD)
  assertEquals(e, expectE)

  var obj = {log: { type:'file', level: {label:'debug', value:10} } }
  e = i.encode(obj)
  assertNotEquals(e.slice(0, 1), EOL, 'Never a blank first line')
  assertNotEquals(e.slice(-2), `${EOL}${EOL}`, 'Never a blank final line')
})

test(function encodeWithOption() {
  var obj = {log: { type:'file', level: {label:'debug', value:10} } }
  const e = i.encode(obj, { section: 'prefix' })

  assertEquals(e, expectF)
})

test(function encodeWithWhitespace() {
  var obj = {log: { type:'file', level: {label:'debug', value:10} } }
  const e = i.encode(obj, { whitespace: true })

  assertEquals(e, expectG)
})
