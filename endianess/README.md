# Endianness [![Build Status](https://travis-ci.org/denolibs/endianness.svg?branch=master)](https://travis-ci.org/denolibs/endianness)
A very simple Deno module to determine the endianness of the host
* Completely written in TypeScript
* No dependancies

## Usage
Example shown is based on a Little Endian host
```
import endianess from 'https://raw.github.com/denolibs/endianness/master/mod.ts';
console.log(endianess.big); // false
console.log(endianess.little); // true
```
