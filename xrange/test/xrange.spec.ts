import numeric from "@xrange/core";

import xrange from "../src";
import errors from "../src/errors";
import { nans, nanofs } from "./entities";

jest.mock("@xrange/core", jest.fn);

describe("xrange(stop)", () => {
	it("should fail when providing `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				// @ts-ignore
				nan
			)).toThrowError(errors["XRANGE:ARGNAN"]);
	});

	it("should set `start` to 0 and `step` to 1 if argument is not negative", () => {
		xrange(5);
		expect(numeric).toHaveBeenCalledWith(0, 5, 1);

		xrange(4.2);
		expect(numeric).toHaveBeenCalledWith(0, 4.2, 1);

		xrange(Infinity);
		expect(numeric).toHaveBeenCalledWith(0, Infinity, 1);

		xrange(+0);
		expect(numeric).toHaveBeenCalledWith(0, +0, 1);

		xrange(-0);
		expect(numeric).toHaveBeenCalledWith(0, -0, 1);
	});

	it("should set `start` to 0 and `step` to -1 if argument is negative", () => {
		xrange(-5);
		expect(numeric).toHaveBeenCalledWith(0, -5, -1);

		xrange(-4.2);
		expect(numeric).toHaveBeenCalledWith(0, -4.2, -1);

		xrange(-Infinity);
		expect(numeric).toHaveBeenCalledWith(0, -Infinity, -1);
	});

	// TODO: #16
	it.todo("should work with decimals");
});

describe("xrange(start, stop)", () => {
	it("should fail if `start` is infinite", () => {
		for (const inf of [ Infinity, -Infinity ])
			expect(() => xrange(inf, 5)).toThrowError(errors["XRANGE:STRINF"]);
	});

	it("should fail is `start` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				// @ts-ignore
				nan,
				5,
			)).toThrowError(errors["XRANGE:STRNAN"]);
	});

	it("should fail is `stop` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				0,
				// @ts-ignore
				nan,
			)).toThrowError(errors["XRANGE:STPNAN"]);
	});

	it("should set `step` to 1 if `start` is not greater than `stop`", () => {
		xrange(-2, 7);
		expect(numeric).toHaveBeenCalledWith(-2, 7, 1);

		xrange(1.2, 3.4);
		expect(numeric).toHaveBeenCalledWith(1.2, 3.4, 1);

		xrange(3, Infinity);
		expect(numeric).toHaveBeenCalledWith(3, Infinity, 1);

		xrange(5, 5);
		expect(numeric).toHaveBeenCalledWith(5, 5, 1);
	});

	it("should set `step` to -1 if `start` is greater than `stop`", () => {
		xrange(7, -2);
		expect(numeric).toHaveBeenCalledWith(7, -2, -1);

		xrange(4.3, 2.1);
		expect(numeric).toHaveBeenCalledWith(4.3, 2.1, -1);

		xrange(3, -Infinity);
		expect(numeric).toHaveBeenCalledWith(3, -Infinity, -1);
	});

	// TODO: #16
	it.todo("should work with decimals");
});

describe("xrange(bound1, bound2, step)", () => {
	it("should fail if `bound1` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				// @ts-ignore
				nan,
				7,
				1,
			)).toThrowError(errors["XRANGE:BD1NAN"]);
	});

	it("should fail if `bound2` is `null`, `NaN`, or a non-numeric value (except for a function)", () => {
		for (const nanof of nanofs)
			expect(() => xrange(
				2,
				// @ts-ignore
				nanof,
				1,
			)).toThrowError(errors["XRANGE:BD2NNF"]);
	});

	it("should fail if `step` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => {
				// @ts-ignore
				xrange(2, 7, nan);
			}).toThrowError(errors["XRANGE:STENAN"]);
	});

	it("should fail if `step` is zero", () => {
		expect(() => xrange(2, 7, +0)).toThrowError(errors["XRANGE:STEZER"]);
		expect(() => xrange(2, 7, -0)).toThrowError(errors["XRANGE:STEZER"]);
	});

	it("should fail if `step` is infinite", () => {
		expect(() => xrange(2, 7, Infinity)).toThrowError(errors["XRANGE:STEINF"]);
		expect(() => xrange(2, 7, -Infinity)).toThrowError(errors["XRANGE:STEINF"]);
	});

	it("should fail if order is acsending and lower bound is infinite", () => {
		expect(() => xrange(-Infinity, 2, 1)).toThrowError(errors["XRANGE:BD1INF"]);
		expect(() => xrange(2, -Infinity, 1)).toThrowError(errors["XRANGE:BD2INF"]);
	});

	it("should fail if order is descending and upper bound is infinite", () => {
		expect(() => xrange(Infinity, -2, -1)).toThrowError(errors["XRANGE:BD1INF"]);
		expect(() => xrange(-2, Infinity, -1)).toThrowError(errors["XRANGE:BD2INF"]);
	});

	it("should sort `bound1` and `bound2` according to parity of `step`", () => {
		xrange(2, 7, 1);
		expect(numeric).toHaveBeenNthCalledWith(/* call: */ 1, /* args: */ 2, 7, 1);

		xrange(7, 2, 1);
		expect(numeric).toHaveBeenNthCalledWith(/* call: */ 2, /* args: */ 2, 7, 1);

		xrange(2, 7, -1);
		expect(numeric).toHaveBeenNthCalledWith(/* call: */ 3, /* args: */ 7, 2, -1);

		xrange(7, 2, -1);
		expect(numeric).toHaveBeenNthCalledWith(/* call: */ 4, /* args: */ 7, 2, -1);
	});

	// TODO: #16
	it.todo("should work with decimals");
});

describe("xrange(start, predicate, next)", () => {
	it("is not yet implemented", () => {
		expect(() => xrange(
			0,
			// @ts-ignore
			() => false,
			() => NaN,
		)).toThrowError(errors["XRANGE:NOIMPL"]);
	});

	// TODO: add cases from test/xrange-start-predicate-next.spec.ts (last seen in 07065630aabde6fc2ddfa53117a6cd2893978c8b)
});

it("should fail without arguments", () => {
	expect(() => {
		// @ts-ignore
		xrange();
	}).toThrowError(errors["XRANGE:ARGREQ"]);
});
