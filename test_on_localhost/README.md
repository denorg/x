# Test on LocalHost

Create a localhost server and run tests.

## Usage

### Programmatically

```javascript
import run from "https://deno.land/x/test_on_localhost@0.2.2/run.ts";

const { success, code } = await run({
  hostname: "0.0.0.0",
  port: 8080,
  list: ["test/foo.ts", "test/bar.ts"],
});

if (success) {
  console.log("all tests passed.");
} else {
  console.log("some tests failed.");
  console.log("status", status);
  Deno.exit(status);
}
```

### Command-Line

File [cli.ts](./cli.ts) can be used as your test runner cli.

```sh
deno -A https://deno.land/x/test_on_localhost@0.2.2/cli.ts \
  --host 0.0.0.0 \
  --port 8080 \
  test/foo.ts test/bar.ts
```

### Real-world Examples

* https://github.com/KSXGitHub/yaml-wasm/blob/2ac301cf5ac9f72f88ef1f46a08c74c7f6dc3e37/run-tests.ts

## License

[MIT](https://git.io/Jvjim) © [Hoàng Văn Khải](https://github.com/KSXGitHub/)
