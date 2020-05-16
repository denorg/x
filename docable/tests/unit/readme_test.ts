import members from "../members.ts";

function stringify(code) {
  return JSON.stringify(code, null, 2);
}

members.test(function README_class() {
  const decoder = new TextDecoder();
  let rawContents = Deno.readFileSync("tests/data/readme/class/expected.json");
  let expected = JSON.parse(decoder.decode(rawContents));

  let compiler = new members.Docable.Compilers.JsonCompiler();

  let actual = compiler.compile(["tests/data/readme/class/input.ts"]);

  const encoder = new TextEncoder();
  const data = encoder.encode(stringify(actual));
  Deno.writeFileSync("tests/data/readme/class/actual.json", data);

  members.assert.equal(expected, actual);
});

members.test(function README_members_only() {
  const decoder = new TextDecoder();
  let rawContents = Deno.readFileSync("tests/data/readme/members_only/expected.json");
  let expected = JSON.parse(decoder.decode(rawContents));

  let compiler = new members.Docable.Compilers.JsonCompiler();

  let actual = compiler.compile(["tests/data/readme/members_only/input.ts"]);

  const encoder = new TextEncoder();
  const data = encoder.encode(stringify(actual));
  Deno.writeFileSync("tests/data/readme/members_only/actual.json", data);

  members.assert.equal(expected, actual);
});
