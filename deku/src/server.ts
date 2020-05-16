import * as path from 'https://deno.land/std@v0.42.0/path/mod.ts'
import { serve } from 'https://deno.land/std@v0.42.0/http/server.ts'
import { acceptWebSocket, WebSocket } from 'https://deno.land/std@v0.42.0/ws/mod.ts'
import { blue } from 'https://deno.land/std@v0.42.0/fmt/colors.ts'

const { readFile, transpileOnly, watchFs, cwd } = Deno

/* common server */
export async function commonServer() {
  const c = serve({ port: 3000 })
  console.log(`${blue('Serve')} site on localhost:3000`)
  for await (const req of c) {
    const { url } = req
    if (url === '/') {
      const data = await readFile('./index.html')
      const html = `<script type="module" src="./web_modules/deku.js"></script>` + decoder(data)
      req.respond({ body: html })
    } else if (url.endsWith('.map')) {
      continue
    } else if (/\.[j|t]sx?/.test(url)) {
      const p = url.split('?')
      const filepath = cwd() + p[0]
      try {
        const data = await readFile(filepath)
        const source = decoder(data)
        const code = await transform(p[0], source)
        const headers = new Headers()
        headers.set('content-type', 'application/javascript')
        req.respond({ body: code, headers })
      } catch (e) {
        console.error(e)
      }
    } else if (url.endsWith('.css')) {
      const data = await readFile(cwd() + url)
      const css = decoder(data)
      const headers = new Headers()
      headers.set('content-type', 'text/css')
      req.respond({ body: css, headers })
    } else {
      req.respond({ body: '404' })
    }
  }
}
/* HMR server */
export async function hmrServer() {
  const w = serve({ port: 4000 })
  console.log(`${blue('Serve')} HRM on localhost:4000`)
  for await (const req of w) {
    const { headers, conn, r, w } = req
    const sock = await acceptWebSocket({
      conn,
      headers,
      bufReader: r,
      bufWriter: w,
    })
    await reload(sock)
  }
}

async function transform(rootName: string, source: string) {
  const result = await transpileOnly({ [rootName]: source }, { strict: false, jsx: 'react', jsxFactory: 'h', sourceMap: false })
  return result[rootName].source
}

function decoder(b: Uint8Array) {
  return new TextDecoder().decode(b)
}

async function reload(sock: WebSocket) {
  const iter = watchFs(cwd())
  const timeMap = new Map()
  for await (const event of iter) {
    const path = await event.paths[0]
    const timestamp = new Date().getTime()
    const oldTime = timeMap.get(path)
    const name = path.replace(cwd() + '\\', '../')
    if (oldTime + 1000 < timestamp || !oldTime) {
      sock.send(
        JSON.stringify({
          timestamp,
          path: name,
        })
      )
      console.log(`${blue(event.kind)} ${path}`)
    }
    timeMap.set(path, timestamp)
  }
}
