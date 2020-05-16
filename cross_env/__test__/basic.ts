await Deno.stdout.write(new TextEncoder().encode(Deno.env.get("FOO")));
