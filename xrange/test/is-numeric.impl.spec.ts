import isNumeric from "../src/is-numeric.impl";
import { nans, nanofs } from "./entities";

it("should return `true` if the value is number and not a `NaN`", () => {
	const values = [ 2, 5, 7, -3, 0, -0, Infinity, -Infinity ] as const;

	for (const value of values)
		expect(isNumeric(value)).toBe(true);
});

it("should return `false` for `NaN`, `null`, and other non-numeric values", () => {
	const values = [ ...nans, ...nanofs ];

	for (const value of values)
		expect(isNumeric(value)).toBe(false);
});
