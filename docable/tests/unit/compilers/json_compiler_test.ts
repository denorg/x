import members from "../../members.ts";

function stringify(code) {
  return JSON.stringify(code, null, 4);
}

members.test(function Compilers_JsonCompiler_compile_class() {
  const decoder = new TextDecoder();
  let rawContents = Deno.readFileSync("tests/data/json_compiler/class_expected.json");
  let expected = JSON.parse(decoder.decode(rawContents));

  let compiler = new members.Docable.Compilers.JsonCompiler();

  let actual = compiler.compile(["tests/data/json_compiler/class_input.ts"]);

  const encoder = new TextEncoder();
  const data = encoder.encode(stringify(actual));
  Deno.writeFileSync("tests/data/json_compiler/class_actual.json", data);

  members.assert.equal(expected, actual);
});

members.test(function Compilers_JsonCompiler_compile_members_only() {
  const decoder = new TextDecoder();
  let rawContents = Deno.readFileSync("tests/data/json_compiler/members_only_expected.json");
  let expected = JSON.parse(decoder.decode(rawContents));

  let compiler = new members.Docable.Compilers.JsonCompiler();

  let actual = compiler.compile(["tests/data/json_compiler/members_only_input.ts"]);

  const encoder = new TextEncoder();
  const data = encoder.encode(stringify(actual));
  Deno.writeFileSync("tests/data/json_compiler/members_only_actual.json", data);

  members.assert.equal(expected, actual);
});
