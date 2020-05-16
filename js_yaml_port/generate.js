import './js-yaml.min.js'

let text = `
/// <reference types="./js-yaml.d.ts" />
import './js-yaml.min.js'

// Re-export keys
`

for (const name in window.jsyaml) {
  text += `export let ${name} = window.jsyaml.${name}\n`
}

console.log(text.trim())
