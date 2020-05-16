import { assertEqual, test, runTests } from "https://deno.land/x/testing/mod.ts";
import { dedupe } from "mod.ts";

test({name: "dedupe", fn: () => {
        assertEqual(dedupe([1, 1, 2, 3, 4, 5, 6]), [1, 2, 3, 4, 5, 6]);
        assertEqual(dedupe([1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 5, 6]), [1, 2, 3, 4, 5, 6]);
        assertEqual(dedupe([1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 5, 6, 1, 1, 1, 1]), [1, 2, 3, 4, 5, 6]);
        assertEqual(dedupe([{a: 1}, {a: 2}, {a: 3}, {a: 3}]), [{a: 1}, {a: 2}, {a: 3}]);
        assertEqual(dedupe([{a: 1, b: 1}, {a: 2, b: 2}, {a: 3, b: 3}, {a: 3, b: 4}], value => value.a),
            [{a: 1, b: 1}, {a: 2, b: 2}, {a: 3, b: 3}]);
}});

runTests();