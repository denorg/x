import * as baloon from './src/balloon.ts'
import * as cows from './src/cows.ts'
import { faces } from './src/faces.ts'
import {IOptions} from './src/models/IOptions.ts'

export const say = function (options: IOptions): string {
	return doIt(options, true);
};

export const think = function (options: IOptions): string {
	return doIt(options, false);
};

export const list = function(): Array<string> {
	return cows.listSync();
}

function doIt (options: IOptions, sayAloud: boolean): string {
	var cowName;
	if (options.random) {
		var cowsList = cows.listSync();
		let nb = Math.floor(Math.random() * cowsList.length); console.log('-------------- ' + nb)
		cowName = cowsList[nb];
	} else {
		cowName = options.cow || "cow";
	}

	var cow = cows.get(cowName);
	var face = faces(options);
	face.thoughts = sayAloud ? "\\" : "o";

	var action = sayAloud ? "say" : "think";

	return baloon[action](options.text, options.wrap ? options.wrapLength : null) + "\n" + cow(face);
}
