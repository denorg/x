import { readline } from "./mod.ts";

const f = await Deno.open("./example.ts");
for await (const line of readline(f)) {
  console.log(`line: ${new TextDecoder().decode(line)}`);
}
f.close();
