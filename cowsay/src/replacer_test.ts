import * as replacer from './replacer.ts'
import { test, assertEquals } from '../test_deps.ts'

test(function test_replacer_default() {
    let res = replacer.default('hi$eyeshi', {eyes: 'oo'})
    assertEquals(res, 'hioohi')
})