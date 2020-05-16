import { prepare } from "https://deno.land/x/plugin_prepare@v0.6.0/mod.ts";
const GITHUB = "https://github.com/xpyxel/deno-zstd/releases/download/0.5.0";

const paths = {
  windows: `${GITHUB}/deno_zstd.dll`,
  linux: `${GITHUB}/libdeno_zstd.so`,
  osx: `${GITHUB}/libdeno_zstd.dylib`,
};

const rid = await prepare({
  name: "deno_zstd",
  checkCache: true,
  urls: {
    windows: paths.windows,
    linux: paths.linux,
    darwin: paths.osx,
  },
});

// @ts-ignore
export const { compress, decompress } = Deno.core.ops();
export const close = () => Deno.close(rid);
