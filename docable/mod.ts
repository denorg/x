import json_compiler from "./src/compilers/json_compiler.ts";

namespace Docable {
  export namespace Compilers {
    export type JsonCompiler = json_compiler;
    export const JsonCompiler = json_compiler;
  }
}

export default Docable;
