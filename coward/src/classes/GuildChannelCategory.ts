import { Client } from "../Client.ts";
import { Message } from "./Message.ts";
import { Channel } from "./Channel.ts";
import { GuildChannel } from "./GuildChannel.ts";

/**
 * Class representing a channel category in a guild
 * @extends GuildChannel
 */
export class GuildChannelCategory extends GuildChannel {
	constructor(data: any, client: Client) {
		super(data, client);
	}
}
