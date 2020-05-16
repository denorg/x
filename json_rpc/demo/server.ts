import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, isWebSocketCloseEvent, WebSocket } from "https://deno.land/std/ws/mod.ts";
import JsonRpc from "../mod.ts";

let connected = new Set<JsonRpc>();

async function initClient(ws: WebSocket) {
	let io = {
		onData(_s: string) {},
		sendData(s: string) { ws.send(s); }
	};
	let jsonrpc = new JsonRpc(io);
	connected.add(jsonrpc);

	jsonrpc.expose("echo.self", data => data);
	jsonrpc.expose("echo.all", data => {
		connected.forEach(other => (other != jsonrpc) && other.notify("echo.notify", data));
		return data;
	});

	try {
		for await (const event of ws.receive()) {
			if (typeof(event) == "string") {
				io.onData(event);
			} else if (isWebSocketCloseEvent(event)) {
				connected.delete(jsonrpc);
			}
		}
	} catch (e) {
		console.error("failed to receive frame", e);
		connected.delete(jsonrpc);
		ws.close(1000).catch(console.error);
	}
}

async function processUpgradeRequest(req: ServerRequest) {
	try {
		let ws = await acceptWebSocket({
			conn: req.conn,
			headers: req.headers,
			bufReader: req.r,
			bufWriter: req.w
		});
		initClient(ws);
	} catch (e) {
		console.error("failed to accept websocket", e);
	}
}

const port = Deno.args[0] || "1234";
console.log("websocket server is running on", port);
for await (const req of serve(`:${port}`)) {
	processUpgradeRequest(req);
}
