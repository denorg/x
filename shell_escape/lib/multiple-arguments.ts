import singleArgument from './single-argument.ts'
export const multipleArguments = (argv: readonly string[]) => argv.map(singleArgument).join(' ')
export default multipleArguments
