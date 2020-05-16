// Copyright (c) 2019 Rafał Pocztarski. All rights reserved.
// MIT License (Expat). See: https://github.com/rsp/deno-ende

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const en = (x: string) => encoder.encode(x);
export const de = (x: Uint8Array) => decoder.decode(x);

export const enc = en;
export const dec = de;

export const encode = en;
export const decode = de;
