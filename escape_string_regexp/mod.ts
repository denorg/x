// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

export function escapeStringRegexp(str: string): string {
	return str.replace(matchOperatorsRe, '\\$&');
}