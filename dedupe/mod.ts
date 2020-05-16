// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.
export function dedupe (client: Array<any>, hasher?: any) {
    hasher = hasher || JSON.stringify;

    const clone = [];
    const lookup = {};

    for (let i = 0; i < client.length; i++) {
        let elem = client[i];
        let hashed = hasher(elem);

        if (!lookup[hashed]) {
            clone.push(elem);
            lookup[hashed] = true;
        }
    }

    return clone;
}