/** @internal */
export default function isNumeric(value: unknown): value is number {
	return typeof value === "number" && !Number.isNaN(value);
}
