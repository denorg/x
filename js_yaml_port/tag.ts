import pkgJson from './package.json'

Deno.run({
  cmd: ['git', 'tag', pkgJson.version],
  stdout: 'inherit',
  stderr: 'inherit',
  stdin: 'inherit'
})
