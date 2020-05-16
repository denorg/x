export function dew () {
  return exports;
}
var exports = {"name":"json5","version":"2.1.0","description":"JSON for humans.","main":"lib/index.js","bin":{"json5":"lib/cli.js"},"browser":"dist/index.js","files":["lib/","dist/"],"engines":{"node":">=6"},"scripts":{"build":"rollup -c","build-package":"node build/package.js","build-unicode":"node build/unicode.js","coverage":"tap --coverage-report html test","lint":"eslint --fix .","prepublishOnly":"npm run production","preversion":"npm run production","production":"npm run lint && npm test && npm run build","test":"tap -Rspec --100 test","version":"npm run build-package && git add package.json5"},"repository":{"type":"git","url":"git+https://github.com/json5/json5.git"},"keywords":["json","json5","es5","es2015","ecmascript"],"author":"Aseem Kishore <aseem.kishore@gmail.com>","contributors":["Max Nanasy <max.nanasy@gmail.com>","Andrew Eisenberg <andrew@eisenberg.as>","Jordan Tucker <jordanbtucker@gmail.com>"],"license":"MIT","bugs":{"url":"https://github.com/json5/json5/issues"},"homepage":"http://json5.org/","dependencies":{"minimist":"^1.2.0"},"devDependencies":{"core-js":"^2.5.7","eslint":"^5.3.0","eslint-config-standard":"^11.0.0","eslint-plugin-import":"^2.14.0","eslint-plugin-node":"^7.0.1","eslint-plugin-promise":"^3.8.0","eslint-plugin-standard":"^3.1.0","regenerate":"^1.4.0","rollup":"^0.64.1","rollup-plugin-buble":"^0.19.2","rollup-plugin-commonjs":"^9.1.5","rollup-plugin-node-resolve":"^3.3.0","rollup-plugin-terser":"^1.0.1","sinon":"^6.1.5","tap":"^12.0.1","unicode-10.0.0":"^0.7.5"},"peerDependencies":{"@jspm/core":"npm:jspm/core@^1.0.0"},"map":{"./lib/index.js":{"browser":"dist/index.js"},"./index.dew.js":{"browser":"dist/index.dew.js"},"./lib/index.dew.js":{"browser":"dist/index.dew.js"}}};
