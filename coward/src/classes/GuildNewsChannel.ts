import { Client } from "../Client.ts";
import { Message } from "./Message.ts";
import { Channel } from "./Channel.ts";
import { GuildChannel } from "./GuildChannel.ts";

/**
 * Class representing a news channel in a guild
 * @extends GuildChannel
 */
export class GuildNewsChannel extends GuildChannel {
	public topic: string;
	public lastMessageID: string; // TODO(fox-cat): contemplate message object here?

	constructor(data: any, client: Client) {
		super(data, client);

		this.topic = data.topic || null;
		this.lastMessageID = data.last_message_id || null;
	}
}
