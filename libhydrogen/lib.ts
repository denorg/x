const VERSION: string = "v0.2.1";

// NOTE: 2 debug/test local libs set env var DENO_PLUGINS to a directory
// containg a shared lib for your os
const PLUGINS: string = Deno.env().DENO_PLUGINS?.trim()?.replace(/\/$/, "") ??
  ".deno_plugins";

const PLUGIN_NAME: string = (Deno.build.os === "win" ? "" : "lib") +
  "deno_libhydrogen" +
  (Deno.build.os === "win"
    ? ".dll"
    : Deno.build.os === "mac" ? ".dylib" : ".so");

const REMOTE: string =
  `https://github.com/chiefbiiko/deno-libhydrogen/releases/download/${VERSION}/${PLUGIN_NAME}`;

const LOCAL: string = `${PLUGINS}/${PLUGIN_NAME}`;

function exists(file: string): boolean {
  try {
    Deno.statSync(file);

    return true;
  } catch (err) {
    if (err.name === "NotFound") {
      return false;
    } else {
      throw err;
    }
  }
}

async function maybe_fetch(): Promise<void> {
  if (!exists(LOCAL)) {
    const response: Response = await fetch(REMOTE);

    if (!response.ok) {
      throw Error(`unable to fetch plugin from ${REMOTE}`);
    }

    const arr_buf: ArrayBuffer = await response.arrayBuffer();

    await Deno.mkdir(PLUGINS, { recursive: true });
    await Deno.writeFile(LOCAL, new Uint8Array(arr_buf));
  }
}

await maybe_fetch();

export const plugin: Deno.Plugin = Deno.openPlugin(LOCAL);
