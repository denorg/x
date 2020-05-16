# 🙃 Invert KV

Invert the key-value pairs in an object in Deno. This is a port of [sindresorhus/invert-kv](https://github.com/sindresorhus/invert-kv).

[![Test CI](https://github.com/denorg/invert-kv/workflows/Test%20CI/badge.svg)](https://github.com/denorg/invert-kv/actions)

```ts
import { invert } from "https://deno.land/x/invert_kv/mod.ts";

const obj = { hello: "world" };

const result = invert(); // { world: "hello" }
```

## 👩‍💻 Development

Run tests:

```bash
deno test
```

## 📄 License

MIT © [Denorg](https://den.org.in)
