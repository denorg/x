/** @private */
const _errors = {
	"XRANGE:NOIMPL": new Error("feature is not implemented"),
	"XRANGE:ARGREQ": new Error("argument is required"),
	"XRANGE:ARGNAN": new Error("argument is not a number"),
	"XRANGE:STPNAN": new Error("argument `stop` is not a number"),
	"XRANGE:STRINF": new RangeError("argument `start` must be finite"),
	"XRANGE:STRNAN": new Error("argument `start` is not a number"),
	"XRANGE:BD1INF": new RangeError("range start (first argument) must be finite"),
	"XRANGE:BD1NAN": new Error("argument `bound1` is not a number"),
	"XRANGE:BD2INF": new RangeError("range start (second argument) must be finite"),
	"XRANGE:BD2NNF": new Error("argument `bound2` is neither a number, nor a function"),
	"XRANGE:STEINF": new RangeError("argument `step` must be finite"),
	"XRANGE:STENAN": new Error("argument `step` is not a number"),
	"XRANGE:STEZER": new RangeError("argument `step` cannot be zero"),
	"XRANGE:NXTNAF": new Error("argument `next` is not a function"),
} as const;

export type Errors = typeof _errors;

export type ErrorCode = keyof Errors;

/** @internal */
export function removeLastStackEntry(error: Error): void {
	if (error.stack == null)
		return;

	const lines = error.stack.split("\n");

	lines.splice(1, 1);
	error.stack = lines.join("\n");
}

/** @internal */
export function createError<Code extends ErrorCode>(code: Code, preserveStack?: "preserve-stack"): Errors[Code] {
	const { message, constructor } = _errors[code];
	const error: Errors[Code] = constructor(`[${ code }] ${ message }`);

	if (preserveStack !== "preserve-stack")
		removeLastStackEntry(error);

	return error;
}

/** @internal */
const errors = Object.create(null);

for (const code in _errors)
	errors[code] = createError(code as ErrorCode);

/** @internal */
export default errors as Errors;
