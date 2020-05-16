import { assert, test, runTests } from "https://deno.land/x/testing/mod.ts";
import { escapeStringRegexp } from "https://raw.githubusercontent.com/Sab94/escape-string-regexp/master/mod.ts";

test({name: "escapeStringRegexp", fn: () => {
        assert.equal(escapeStringRegexp('\\ ^ $ * + ? . ( ) | { } [ ]'), 
            '\\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]');
}});

runTests();