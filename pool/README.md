[![Build Status](https://github.com/axetroy/deno_cross_env/workflows/test/badge.svg)](https://github.com/axetroy/deno_cross_env/actions)

### Generic pool for Deno

> A generic resource pool management library
>
> eg. managing db/RPC connection and so on.

### Features

- [x] Graceful to create/destroy the resource
- [x] Keep a number of resources in the pool (depend on `option.min` && `option.max`)
- [x] Automatically destroy idle resources
- [x] Easy to Use
- [x] test cover

### Usage

```typescript
import { Pool } from 'https://deno.land/x/pool@v0.1.0/mod.ts'

// fake db
interface Db {
  query(params: string): Promise<any> // query data
  disconnect(): void // disconnect
}

function connectToDataBase(): Db {
  return {
    query: async (params: string) => {
      return 'axetroy'
    },
    disconnect: () => {},
  }
}

const pool = new Pool<Db>({
  min: 1,
  max: 10,
  // defined how to create a resource
  creator: async (pool, resourceID) => {
    return connectToDataBase()
  },
  // defined how to destroy a resource
  destroyer: async (pool, resource) => {
    return resource.resource.disconnect()
  },
})

// get resource from pool
const conn = await pool.get()

const name: string = await conn.query('name')

console.log('My name is: ', name)

// destroy the pool
// When you no longer need the resource pool
// you need to destroy it, otherwise the internal loop will continue and the process will not exit
pool.destroy()
```

## License

The [MIT License](LICENSE)
