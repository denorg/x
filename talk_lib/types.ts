
import { Client } from "./mod.ts";

/**
 * Wrapper of people
 */
export interface PeopleObject {
	[key: string]: Author;
}

/**
 * Message options, see Message class for definitions
 */
interface MessageOptions {
	content: string;
	timestamp: number;
	authorId: string;
	id: number;
	parameters: any;
	isReplyable: boolean;
	quoted: Message | void;
	channel: Channel;
}

/**
 * Message class
 * @param id Message's sequential ID
 * @param content Message's main content
 * @param timestamp Date object for the creation time of the message, precise to the second
 * @param author Message's author, adheres to Author class
 * @param parameters Message parameters. Actors, mentioned people, etc.
 * @param isReplyable Whether the message is replyable
 * @param quoted Quoted message, can be void if no message was quoted
 * @param channel Channel the message was posted in
 */
export class Message {

	id: number;
	content: string;
	timestamp: Date;
	author: Author;
	parameters: any;
	isReplyable: boolean;
	quoted: Message | void;
	channel: Channel;

	constructor({
		content, channel, timestamp,
		authorId, id, parameters,
		isReplyable, quoted
	}: MessageOptions, knownPeople: PeopleObject) {
		this.content = content;
		this.timestamp = new Date(timestamp * 1e3);
		this.id = id;
		this.parameters = parameters;
		this.isReplyable = isReplyable;

		this.author = knownPeople[authorId] || { name: "Unknown factor", id: "u.factor", type: 0 };
		if(!knownPeople[authorId]) {
			// console.log(knownPeople, authorId, -1);
		}
		this.quoted = quoted;
		this.channel = channel;

	}

	/**
	 * Quote and reply to a message
	 * @param input Content to send
	 */
	public async reply(input: string | SendOptions) {
		
		if(typeof input === "string") {
			input = {
				content: input
			}
		}
		
		this.channel.send({
			content: input.content,
			quote: this.id
		});
	}

}

/**
 * Author types
 * @param name author's name, "John Doe"
 * @param id author's id, "j.doe"
 * @param type author type
 */
interface AuthorOptions {
	name: string;
	id: string;
	type: number;
}

/**
 * Author (often a user)
 * @param name author's name, "John Doe"
 * @param id author's id, "j.doe"
 * @param type author type
 */
export class Author {
	public name: string;
	public id: string;
	public type: number;

	constructor({ name, id, type }: AuthorOptions) {
		this.name = name;
		this.id = id;
		this.type = type;
	}

}

/**
 * Passable options to Channel
 */
interface ChannelOptions {
	name: string;
	token: string;
	displayName: string;
	readOnly: number; // ????
	hasPassword: boolean;
	hasCall: boolean;
	isFavorite: boolean;
	notificationLevel: number;
	unreadMessages: number;
	unreadMention: boolean;
	lastMessage: any;
}

/**
 * Channel class
 * @param name Channel name
 * @param token Channel token
 * @param displayName Channel's display name
 * @param readOnly Whether channel is read only
 * @param hasCall Whether channel has call
 * @param isFavorite Whether channel is a user favorite
 * @param notificationLevel Level of notifications to be received
 * @param unreadMessages Amount of unread messages
 * @param unreadMention Whether there is an unread mention
 * @param client Optional, the bot's client. Passed so that it can be used to send messages
 * @param lastMessage Last message in channel
 */
export class Channel {

	public name: string;
	public token: string;
	public displayName: string;
	public readOnly: number; // ????
	public hasPassword: boolean;
	public hasCall: boolean;
	public isFavorite: boolean;
	public notificationLevel: number;
	public unreadMessages: number;
	public unreadMention: boolean;
	public client?: Client; // I'd rather not do this, but idk if I have a choice
	public lastMessage: any;

	constructor({
		name,
		token,
		displayName,
		readOnly,
		hasPassword,
		hasCall,
		isFavorite,
		notificationLevel,
		unreadMessages,
		unreadMention,
		lastMessage,
	}: ChannelOptions, client: Client | undefined = undefined) {
		this.name = name;
		this.token = token;
		this.displayName = displayName;
		this.readOnly = readOnly;
		this.hasPassword = hasPassword;
		this.hasCall = hasCall;
		this.isFavorite = isFavorite;
		this.notificationLevel = notificationLevel;
		this.unreadMessages = unreadMessages;
		this.unreadMention = unreadMention;
		this.lastMessage = lastMessage;
		this.client = client ?? undefined;
	}

	 /** 
	 * Send a message in channel
	 * 
	 *     myChannel.send("Hello world!") 
	 * or
	 * 
	 *     myChannel.send({
	 *         content: "Hello world!",
	 *         quote: myMessageId
	 *     });
	 */ 
	public send(input: string | SendOptions) {

		if(typeof input === "string") {
			input = {
				content: input
			}
		}

		if(input.content.startsWith("/")) input.content = input.content.replace(/\//, "|"); // Commands are weird in this, this is the best I can come up with 

		let messageForm = new FormData();
		messageForm.append("message", input.content);
		if(input.quote) messageForm.append("replyTo", input.quote.toString());

		if(this.client) {
			fetch(`https://${this.client.url}/ocs/v2.php/apps/spreed/api/v1/chat/${this.token}`, {
				method: "POST",
				headers: this.client.headers,
				body: messageForm
			});
		} else {
			// Some more error handling might be nice...
			console.log("NO CLIENT");
		}

	}

	public async fetchMessages() {
		if(this.client) {
			let data = await (await fetch(
				`https://${this.client.url}/ocs/v2.php/apps/spreed/api/v1/chat/${this.token}?lookIntoFuture=0&includeLastKnown=1`,
				{
					headers: this.client.headers
				}
			)).json();

			let people = this.client?.people ?? {};
			let msgs = data.ocs.data;
			let messages: Message[] = msgs.map((msg: any) => this.client?.toMessage(msg));

			for(let msg of messages) {
				msg.channel = this;
			}

			return messages;
		} else {
			console.log("No client;");				   	
			return [];
		}
	}

}

/**
 * Message sending options
 * @param content Main message content
 * @param quote Optional, ID of message to quote
 */
interface SendOptions {
	content: string;
	quote?: number;
}
