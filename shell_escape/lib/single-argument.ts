import { NEED_ESCAPE } from './regexes.ts'

const escape = (value: string) =>
  `'${value.replace(/'/g, "'\\''")}'`
    .replace(/^(?:'')+/g, '') // deduplicate single-quotes
    .replace(/\\'''/g, "\\'") // remove non-escaped single-quote if there are enclosed between 2 escaped

export const singleArgument = (value: string) =>
  NEED_ESCAPE.test(value) ? escape(value) : value

export default singleArgument
