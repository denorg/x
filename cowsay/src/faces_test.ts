import * as faces from './faces.ts'
import { test, assertEquals } from '../test_deps.ts'

test(function test_faces_b() {
    let res = faces.faces({ mode: 1})
    assertEquals(res, { eyes: "==", tongue: "  " })
})

test(function test_faces_d() {
    let res = faces.faces({ mode: 2 })
    assertEquals(res, { eyes: "xx", tongue: "U " })
})