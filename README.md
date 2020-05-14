# 🧺 Denorg X

Denorg X (https://x.den.org.in) is a mirror of `deno.land/x` for third-party Deno modules. It's served from GitHub Pages with a Cloudflare CDN.

[![Build site](https://github.com/denorg/x/workflows/Build%20site/badge.svg)](https://github.com/denorg/x/actions?query=workflow%3A%22Build+site%22)

## ⚠️ Known caveats

- Currently only supports the `master` branch (e.g., https://x.den.org.in/abc/mod.ts)

## 💡 How it works

1. We fetch all packages from Deno's [database](https://github.com/denoland/deno_website2/blob/master/database.json) every day
2. We download them and serve them from the [`gh-pages`](https://github.com/denorg/x/tree/gh-pages) branch
3. We cache them for 24 hours, both in your browser and on our CDN:
 - Page rule: `x.den.org.in/*`
 - Browser Cache TTL: 24 hours
 - Cache Level: Cache Everything
 - Edge Cache TTL: 24 hours
4. You import a package from its URL: https://x.den.org.in/abc/mod.ts

```ts
import { Application } from "https://x.den.org.in/abc/mod.ts"
const app = new Application();
app
  .get("/hello", (c) => {
    return "Hello, Abc!";
  })
  .start({ port: 8080 });
```
