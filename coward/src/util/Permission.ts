import { Permissions } from "./Constants.ts"

/** Class for permission utilities */
export function permToArray(perms: number): Array<string> {
	var arr = new Array<string>();
	var i: number;
	for(const key of Object.keys(Permissions)) {
		if((perms & (Permissions as any)[key]) == (Permissions as any)[key]) {
			arr.push(key.toString());
		}
	}
	console.log(arr);
	return(arr);
}
