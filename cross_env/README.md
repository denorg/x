[![Build Status](https://github.com/axetroy/deno_cross_env/workflows/test/badge.svg)](https://github.com/axetroy/deno_cross_env/actions)

### setting environment variable

> A tool for setting environment variables across platforms

### Install

```bash
deno install -f --allow-run --allow-env https://deno.land/x/cross_env@v0.4.0/cross-env.ts
```

### Usage

```shell
cross-env PORT=8080 HOST=0.0.0.0 deno https://deno.land/std/http/file_server.ts
```

## License

The [MIT License](LICENSE)
