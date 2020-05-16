declare var WebSocket: any;

import JsonRpc from "../mod.ts";

let ws = new WebSocket("ws://localhost:1234");

ws.addEventListener("open", () => {
	let io = {
		onData(_s: string) {},
		sendData(s: string) { ws.send(s); }
	}

	ws.addEventListener("message", e => io.onData(e.data));
	let jsonrpc = new JsonRpc(io);

	jsonrpc.expose("echo.notify", data => console.log("notify", data));

	setInterval(async () => {
		const method = (Math.random() < 0.5 ? "echo.all" : "echo.self");
		const data = {number: Math.random()};
		console.log("call", method, data);
		try {
			let result = await jsonrpc.call(method, data);
			console.log("result", result)
		} catch(e) {
			console.error(e);
		}
	}, 3000);
});
