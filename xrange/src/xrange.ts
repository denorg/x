import xrangeNumeric = require("@xrange/core");

import type XRange from "./typings/xrange";

import { createError } from "./errors";
import isNumeric from "./is-numeric.impl";

export default function xrange(stop: number): XRange;
export default function xrange(start: number, stop: number): XRange;
export default function xrange(bound1: number, bound2: number, step: number): XRange;

export default function xrange(first: number, second?: number, third?: number): XRange {
	if (arguments.length === 0)
		throw createError("XRANGE:ARGREQ");

	// ***

	if (arguments.length === 1)
		if (!isNumeric(first))
			throw createError("XRANGE:ARGNAN");

		else
			return xrangeNumeric(0, first, Math.sign(first) || 1);

	// ***

	if (arguments.length === 2)
		if (!isNumeric(first))
			throw createError("XRANGE:STRNAN");

		else if (!isNumeric(second))
			throw createError("XRANGE:STPNAN");

		else if (!isFinite(first))
			throw createError("XRANGE:STRINF");

		else
			return xrangeNumeric(first, second, first <= second ? 1 : -1);

	// ***

	if (!isNumeric(first))
		throw createError("XRANGE:BD1NAN");

	else if (!isNumeric(second))
		if (typeof second !== "function")
			throw createError("XRANGE:BD2NNF");

		else
			throw createError("XRANGE:NOIMPL"); // TODO: looplike implementation

	else if (!isNumeric(third))
		throw createError("XRANGE:STENAN");

	else if (!isFinite(third))
		throw createError("XRANGE:STEINF");

	else if (third === 0)
		throw createError("XRANGE:STEZER");

	else {
		const isUp = third > 0;
		const isSorted = first <= second;
		const isDirect = isUp === isSorted;

		const [ start, stop ] = isDirect ? [ first, second ] : [ second, first ];

		if (!isFinite(start))
			throw createError(isDirect ? "XRANGE:BD1INF" : "XRANGE:BD2INF");

		return xrangeNumeric(start, stop, third);
	}
}
