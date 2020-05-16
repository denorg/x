[![GitHub release](https://img.shields.io/github/release/crookse/docable.svg?color=brightgreen&label=latest)](https://github.com/crookse/docable/releases)
[![Travis (.org) branch](https://travis-ci.com/crookse/docable.svg?branch=master)](https://travis-ci.com/crookse/docable)

# docable
An open-source doc block parser for generating documenation as JSON.

docable takes an array of input files and uses regex to find the doc blocks of the input files. It makes use of JSDoc annotations to generate a JSON object that describes your code.

_Currently, the parser is opinionated. All descriptions of annotations in the doc blocks must be four spaces from the `*` character. Future releases will be less opinionated and will handle parsing via configs._

[View Previewer & Documentation](https://crookse.github.io/docable/#/)

Special thanks to [@dsherret](https://github.com/dsherret) for helping with this project :)

## Quickstart

Write your `compiler.ts` file ...

```typescript
import Docable from "https://deno.land/x/docable@v0.1.3/mod.ts";

const encoder = new TextEncoder();
const compiler = new Docable.Compilers.JsonCompiler();

let compiled = compiler.compile([
  "/path/to/your/first_file.ts",
  "/path/to/your/second_file.ts",
  "/path/to/your/third_file.ts"
]);
let encoded = encoder.encode(JSON.stringify(compiled, null, 4));

Deno.writeFileSync("/path/to/output_file.json", encoded);
```

... and run your `compiler.ts` file ...

```shell
$ deno --allow-read --allow-write compiler.ts
```

## Example Input/Output Of Class Files

If you have the following class file and pass it to the `Docable.Compilers.JsonCompiler` class' `compile()` method ...

```typescript
/**
 * @memberof Docable.Classes
 * @class ClassOne
 *
 * @description
 *     Class one does class one things.
 */
export default class ClassOne {
  /**
   * @property string property_one
   *
   * @description
   *     This is the first paragraph of the description.
   *
   *     This is the second paragraph of the description.
   */
  public property_one: string = "";

  /**
   * @description
   *     This is the first paragraph.
   *     This is also the first paragraph because it is not separated by an
   *     empty line like in property_one.
   *
   * @param any myObject
   *     My object.
   * @param string myString
   *     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
   *     malesuada leo, vitae vehicula tellus. 
   *
   * @return any|undefined
   *     Returns any when something cool happens.
   *
   *     Returns undefined when something cool doesn't happen... womp womp.
   *
   * @return string
   *     You can have multiple return annotations if you that's how you roll.
   *
   * @throws SomeException
   *     Thrown when something bad happens.
   *
   * @throws SomeOtherException
   *     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
   *     malesuada leo, vitae vehicula tellus. Aliquam a est in nisi placerat
   *     placerat quis vitae lectus.
   */
  public methodOne(myObject: any, myString: string) {}
}
```

... it will output the following JSON ...

```json
{
  "Docable.Classes": {
    "ClassOne": {
      "fully_qualified_name": "Docable.Classes.ClassOne",
      "namespace": "Docable.Classes",
      "name": "ClassOne",
      "description": [
        "Class one does class one things."
      ],
      "properties": {
        "property_one": {
          "access_modifier": "public",
          "description": [
            "This is the first paragraph of the description.",
            "This is the second paragraph of the description."
          ],
          "annotation": {
            "line": "@property string property_one",
            "data_type": "string",
            "name": "property_one"
          },
          "signature": "public property_one: string = \"\"",
          "name": "property_one",
          "fully_qualified_name": "Docable.Classes.ClassOne.property_one"
        }
      },
      "methods": {
        "methodOne": {
          "access_modifier": "public",
          "name": "methodOne",
          "description": [
            "This is the first paragraph.\nThis is also the first paragraph because it is not separated by an\nempty line like in property_one."
          ],
          "params": {
            "myObject": {
              "name": "myObject",
              "description": [
                "My object."
              ],
              "annotation": {
                "line": "@param any myObject",
                "data_type": "any",
                "name": "myObject"
              }
            },
            "myString": {
              "name": "myString",
              "description": [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus\nmalesuada leo, vitae vehicula tellus."
              ],
              "annotation": {
                "line": "@param string myString",
                "data_type": "string",
                "name": "myString"
              }
            }
          },
          "returns": [
            {
              "description": [
                "Returns any when something cool happens.",
                "Returns undefined when something cool doesn't happen... womp womp."
              ],
              "annotation": {
                "line": "@return any|undefined",
                "data_type": "any|undefined",
                "name": null
              }
            },
            {
              "description": [
                "You can have multiple return annotations if you that's how you roll."
              ],
              "annotation": {
                "line": "@return string",
                "data_type": "string",
                "name": null
              }
            }
          ],
          "throws": [
            {
              "description": [
                "Thrown when something bad happens."
              ],
              "annotation": {
                "line": "@throws SomeException",
                "data_type": "SomeException",
                "name": null
              }
            },
            {
              "description": [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus\nmalesuada leo, vitae vehicula tellus. Aliquam a est in nisi placerat\nplacerat quis vitae lectus."
              ],
              "annotation": {
                "line": "@throws SomeOtherException",
                "data_type": "SomeOtherException",
                "name": null
              }
            }
          ],
          "signature": "public methodOne(myObject: any, myString: string)",
          "is_async": false,
          "fully_qualified_name": "Docable.Classes.ClassOne.methodOne"
        }
      }
    }
  }
}
```

## Example Input/Output Of "Members Only" Files

If you have files that have a bunch of members not belonging to a class, then add `/// @members-only` at the top of your file. 

For example, the following "members only" file ...

```typescript
/// @members-only

/**
 * @memberof Docable.Util
 * @interface MyCoolInterface
 *
 * @description
 *     An interface to hold myCoolFunction's options.
 */
export interface MyCoolInterface {
  my?: string;
  cool?: string;
  interface?: string;
}

/**
 * @memberof Docable.Util
 * @function myCoolFunction
 *
 * @description
 *     A cool function that returns a message.
 *
 * @param string message
 *     The message to return.
 *
 * @return string
 *     Returns the message.
 */
export function myCoolFunction(message: string): string {
  return message;
}
```

... outputs the following JSON ...

```json
{
  "Docable.Util": {
    "MyCoolInterface": {
      "is_exported": true,
      "name": "MyCoolInterface",
      "description": [
        "An interface to hold myCoolFunction's options."
      ],
      "signature": "export interface MyCoolInterface {\n  my?: string;\n  cool?: string;\n  interface?: string;\n}",
      "is_interface": true,
      "fully_qualified_name": "Docable.Util.MyCoolInterface"
    },
    "myCoolFunction": {
      "is_exported": true,
      "name": "myCoolFunction",
      "description": [
        "A cool function that returns a message."
      ],
      "params": {
        "message": {
          "name": "message",
          "description": [
            "The message to return."
          ],
          "annotation": {
            "line": "@param string message",
            "data_type": "string",
            "name": "message"
          }
        }
      },
      "returns": [
        {
          "description": [
            "Returns the message."
          ],
          "annotation": {
            "line": "@return string",
            "data_type": "string",
            "name": null
          }
        }
      ],
      "throws": null,
      "signature": "export function myCoolFunction(message: string): string",
      "is_function": true,
      "fully_qualified_name": "Docable.Util.myCoolFunction"
    }
  }
}
```

## Ignoring Doc Blocks

Add `@ignore` to the doc blocks you want the parser to ignore. All members without a doc block will also be ignored by default since the parser looks for doc blocks.

* Ignoring a doc block in a class file:

```typescript
/**
 * @memberof Docable.Classes
 * @class ClassOne
 *
 * @description
 *     Class one does class one things.
 */
export default class ClassOne {
  /**
   * @property string property_one
   *
   * @description
   *     This is the description.
   */
  public property_one: string = "";

  /**
   * @ignore
   * @property string property_two
   *
   * @description
   *     This is the description.
   */
  public property_two: string = "";
}
```

* Ignoring a doc block in a members only file:

```typescript
/// @members-only

/**
 * @ignore
 * @memberof Docable.Util
 * @interface MyCoolInterface
 *
 * @description
 *     An interface to hold myCoolFunction's options.
 */
export interface MyCoolInterface {
  my?: string;
  cool?: string;
  interface?: string;
}
```
