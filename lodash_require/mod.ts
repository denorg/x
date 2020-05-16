import { createRequire } from 'https://deno.land/std/node/module.ts';

//@ts-ignore
const require_ = createRequire(import.meta.url);
const lodash = require_('./lodash-npm');

export default lodash;