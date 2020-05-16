import replacer from './replacer.ts'
import * as cows from './cows/cows.ts'

export const get = function (cow: string) {
	let text = cows[cow]
	return function (options) {
		return replacer(text, options);
	};
}

export const listSync = function (): Array<string> {
	return [
		'atom',
		'bearface',
		'biohazard',
		'box',
		'cat',
		'cat2',
		'coffee',
		'cube',
		'cow',
		'fox',
		'hand',
		'kitten',
		'mule',
		'world',
		'yasuna',
	]
}
