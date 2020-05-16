import { Client } from "../Client.ts";
import { Message } from "./Message.ts";
import { Channel } from "./Channel.ts";
import { GuildChannel } from "./GuildChannel.ts";

/**
 * Class representing a store channel in a guild
 * @extends GuildChannel
 */
export class GuildStoreChannel extends GuildChannel {
	constructor(data: any, client: Client) {
		super(data, client);
	}
}
