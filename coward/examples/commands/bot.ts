import { Coward, Message } from "https://deno.land/x/coward/mod.ts"

let client = new Coward("TOKEN")
const prefix = "-"

client.on("ready", () => {
	console.log("Ready!")
})

client.on("messageCreate", async (message: Message) => {
	// Ignore messages from bot accounts.
	if(message.author.bot) return;

	// Ignore messages that don't start with the prefix.
	if(!message.content.startsWith(prefix)) return;

	// Splits the message content into an array of substrings.
	// .substring(prefix.length) - Removes the prefix characters
	// .split(" ") - splits the arguments at every whitespace
	// An example of the args are ["ping"], ["avatar", "<@264689606283231234>"]
	let args = message.content.substring(prefix.length).split(" ")

	// .shift() removes the first item of an array. In this case,
	// it removes the command and returns it.
	let command = args.shift()

	switch(command) {
		case "ping":
			client.postMessage(message.channel.id, "pong!")
			break;
		case "foo":
			client.postMessage(message.channel.id, "bar")
			break;
		case "say":
			if(!args[0]) {
				return client.postMessage(
					message.channel.id,
					"You need to tell the bot to say something!"
				)
			}
			// Join the array of arguments with whitespace.
			const say = args.join(" ")
			client.postMessage(message.channel.id, say)
			break;
		case "embed":
			client.postMessage(message.channel.id, {
				embed: {
					title: "Example!",
					description: "This is an example embed.",
					color: 0x7289DA
				}
			})
			break;
	}
})

client.connect()
