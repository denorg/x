import * as dotenv from './mod.ts'

console.log(dotenv.config({}))
console.log(Deno.env.get('PASSWORD'))
