import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent
} from "https://deno.land/std/ws/mod.ts";

export const ws = async (portl) => {
  const port = "8080";
  console.log(`websocket is running on port ${port}`);
  for await (const req of serve(`:${port}`)) {
    const { headers, conn } = req;
    acceptWebSocket({
      conn,
      headers,
      bufReader: req.r,
      bufWriter: req.w
    })
      .then(async (sock) => {
        console.log("socket connected");
        const it = sock.receive();
        const send = (obj) => sock.send(JSON.stringify(obj));

        while (true) {
          try {
            const { done, value } = await it.next();
            if (done) {
              break;
            }
            const ev = value;
            if (typeof ev === "string") {
              console.log("ws:Text", ev);

              portl({ send, received: JSON.parse(ev) });
            } else if (ev instanceof Uint8Array) {
              console.log("ws:Binary", ev);
            } else if (isWebSocketPingEvent(ev)) {
              const [, body] = ev;

              console.log("ws:Ping", body);
            } else if (isWebSocketCloseEvent(ev)) {
              const { code, reason } = ev;
              console.log("ws:Close", code, reason);
            }
          } catch (e) {
            console.error(`failed to receive frame: ${e}`);
            await sock.close(1000).catch(console.error);
          }
        }
      })
      .catch((err) => {
        console.error(`failed to accept websocket: ${err}`);
      });
  }
};
