import * as balloon from './balloon.ts'
import { test, assert } from '../test_deps.ts'

test(function test_balloon_say_1() {
    let res = balloon.say('deno', 30)
    assert(res.indexOf('deno') > 0)
})

test(function test_balloon_say_2() {
    let res = balloon.say('deno', 3)
    assert(res.indexOf('deno') < 0)
})

test(function test_balloon_say_3() {
    let res = balloon.say('deno', 30)
    assert(res.indexOf('< deno') > 0)
})

test(function test_balloon_think_1() {
    let res = balloon.think('deno', 30)
    assert(res.indexOf('deno') > 0)
})

test(function test_balloon_think_2() {
    let res = balloon.think('deno', 3)
    assert(res.indexOf('deno') < 0)
})

test(function test_balloon_think_3() {
    let res = balloon.think('deno', 30)
    assert(res.indexOf('( deno') > 0)
})

