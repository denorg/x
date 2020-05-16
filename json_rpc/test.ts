import { test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals, assertThrowsAsync, assert } from "https://deno.land/std/testing/asserts.ts";
import JsonRpc, { IO } from "./mod.ts";

let client, server : IO;
let crpc, srpc: JsonRpc;

function setup() {
	client = {
		onData(_s: string) {},
		sendData(s: string) { server.onData(s); }
	}

	server = {
		onData(_s: string) {},
		sendData(s: string) { client.onData(s); }
	}
	crpc = new JsonRpc(client);
	srpc = new JsonRpc(server);
	srpc.expose("echo", data=>data);
}

test("echo", async function() {
	setup();
	const params = {a:"b"};
	let result = await crpc.call("echo", params);
	assertEquals(params, result);
});

test("method not found", async function() {
	setup();
	await assertThrowsAsync(async () => crpc.call("not-found", {}));
});
/*
test("batch", async function() {
	setup();

	let requests = [
		{method:"echo", params:["b"], jsonrpc:"2.0", id:"1"},
		{method:"echo", params:["d"], jsonrpc:"2.0", id:"2"}
	];

	server.sendData = (s: string) => {
		assertEquals(s, "aaa");
	}
	server.onData(JSON.stringify(requests));
});
*/