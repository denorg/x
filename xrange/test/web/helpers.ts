/**
 * @jest-environment jsdom
 */

import type XRange from "../../src/typings/xrange";

declare global {
	const xrange: typeof import("../../src");
}

/** @private */
type TagName = keyof HTMLElementTagNameMap;

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export function createElements<Tag extends TagName>(range: XRange, tagName?: Tag, limit = Infinity): HTMLElementTagNameMap[Tag][] {
	const elements: HTMLElementTagNameMap[Tag][] = [];

	for (const number of range) {
		if (elements.length >= limit)
			break;

		const element = document.createElement(tagName ?? "span" as Tag);

		element.classList.add("xrange-generated", `xrange-number-${ number }`);
		element.innerHTML = number.toString();

		elements.push(element);
	}

	return elements;
}

export function appendElements(...args: Parameters<typeof createElements>): string {
	const hashlike = `xrange-hash-${ Date.now() }`; // try not to use '-ish' suffix here
	const fragment = document.createDocumentFragment();

	for (const element of createElements(...args)) {
		element.classList.add(hashlike);
		fragment.append(element);
	}

	document.body.append(fragment);

	return hashlike;
}

export function cleanupBody(): void {
	const { body } = document;

	while (body.firstChild)
		body.removeChild(body.firstChild);
}
