/** 
 * @jest-environment jsdom
 */

import { appendElements, cleanupBody, $, $$ } from "./helpers";

it("should create global `xrange` object", async () => {
	expect(typeof xrange).toBe("function");
});

describe("with DOM manipulation", () => {
	afterEach(cleanupBody);

	it("should work with `stop` argument", () => {
		appendElements(xrange(5));
		expect($$(".xrange-generated")).toHaveLength(5);
	});

	it("should work with `start` and `stop` arguments", () => {
		appendElements(xrange(17, 42));

		expect($$(".xrange-generated")).toHaveLength(25);
		expect($(".xrange-number-16")).toBe(null);
	});

	it("should work with `bound1`, `bound2`, and `step` arguments", () => {
		const expected = [ 17, 22, 27, 32, 37 ] as const;

		appendElements(xrange(17, 42, 5));

		expect($$(".xrange-generated")).toHaveLength(expected.length);

		for (const number of expected)
			expect($(`.xrange-number-${ number }`)).toBeInstanceOf(HTMLElement);
	});

	it.todo("should work with `start`, `predicate`, and `next` arguments");
	it.todo("should work with `start`, `predicate`, `next` and `maxMemo` arguments");
});
