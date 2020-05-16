import * as cows from './cows.ts'
import { test, assert } from '../test_deps.ts'

test(function test_cows_listSync() {
    let cow = cows.listSync()
    assert(cow.indexOf('cow') > 0)
})