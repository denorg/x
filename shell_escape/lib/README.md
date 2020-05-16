# Deno Shell Escape

Escape and stringify an array of arguments to be executed on the shell.

This is a port of https://github.com/xxorax/node-shell-escape.git for Deno.

## Example

### Simple

```typescript
import { multipleArguments } from 'https://deno.land/x/shell_escape'
const argv = ['curl', '-v', '-H', 'Location;', '-H', 'User-Agent: dave#10', 'http://www.daveeddy.com/?name=dave&age=24']
const escaped = multipleArguments(argv)
console.log(escaped)
```

yields

```
curl -v -H 'Location;' -H 'User-Agent: dave#10' 'http://www.daveeddy.com/?name=dave&age=24'
```

### Advanced

```typescript
import { multipleArguments } from 'https://deno.land/x/shell_escape'
const argv = ['echo', 'hello!', 'how are you doing $USER', '"double"', "'single'"]
const escaped = multipleArguments(argv)
console.log(escaped)
```

yields

```
echo 'hello!' 'how are you doing $USER' '"double"' \''single'\'
```

## Thanks

Special thanks to contributors of [node-shell-escape](https://github.com/xxorax/node-shell-escape.git) for the code.

## License

[MIT](https://git.io/JvNkN) © [Hoàng Văn Khải](https://github.com/KSXGitHub/)
