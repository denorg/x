import * as cowsay from './mod.ts'
import { test, assert } from './test_deps.ts'

test(function test_cowsay_1() {
    let res = cowsay.say({
        text: 'Deno Is Great'
    })
    assert(res.indexOf('Deno Is Great')>0)
})

test(function test_cowsay_random() {
    let res = cowsay.say({
        text: 'Deno Is Great',
        random: true
    })
    assert(res.indexOf('Deno Is Great')>0)
})

test(function test_cowsay_eyes() {
    let res = cowsay.say({
        text: 'Deno Is Great',
        eyes: '@@'
    })
    assert(res.indexOf('@@')>0)
})

test(function test_cowsay_tongue() {
    let res = cowsay.say({
        text: 'Deno Is Great',
        tongue: '%'
    })
    assert(res.indexOf('%')>0)
})

test(function test_cowsay_mode_d() {
    let res = cowsay.say({
        text: 'Deno Is Great',
        mode: 2
    })
    assert(res.indexOf('xx')>0)
    assert(res.indexOf('U')>0)
})



