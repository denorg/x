
import { catYou } from 'https://deno.land/x/cat_you/mod.ts';
import { config } from "https://deno.land/x/dotenv/dotenv.ts";
const env = config();

import { Client, Message } from "./mod.ts";

const client = new Client({
	url: env.URL,
	username: env.USERNAME,
	password: env.PASSWORD
});

client.on("ready", (evt: Client) => {
	console.log("The bot is ready and listening!");
});

client.on("message", (evt: Message) => {
	console.log(`${evt.author.name}: ${evt.content}`);
	
	if(evt.content === "zeg is") {
		evt.channel.send("Hello!");
	}

	if(evt.content.toLowerCase().startsWith("cat ")) {
		let txt = evt.content.slice(4).trim();
		let catStr = catYou(txt).replace(/\\/g, "|");
		evt.reply(catStr || "Niet gevonden");
	}

	if(evt.content.toLowerCase() === "yo" && evt.author.id !== client.user?.id) {
		evt.reply("Yo");
	}

	if(evt.content.toLowerCase().startsWith("zeg:")) {
		let txt = evt.content.slice(4).trim();
		evt.channel.send(txt);
	}

	if(evt.content.toLowerCase() === "ping") {
		evt.reply("Pong!");
	}

});

client.start().then(() => {
	console.log("Started");
});