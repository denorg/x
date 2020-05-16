import { Client } from "../Client.ts";
import {
	GuildTextChannel,
	DMChannel,
	GuildVoiceChannel,
	GuildChannelCategory,
	GuildNewsChannel,
	GuildStoreChannel
} from "../Classes.ts";

/** Class representing a channel */
export class Channel {
	public id: string;
	public type: number;
	protected _client: Client;

	constructor(data: any, client: Client) {
		this.id = data.id;
		this.type = data.type;
		this._client = client;
	}

	static from(data: any, client: Client) {
		switch(data.type) {
			case 0:
				return new GuildTextChannel(data, client);
				break;
			case 1:
				return new DMChannel(data, client);
				break;
			case 2:
				return new GuildVoiceChannel(data, client);
				break;
			case 3:
				//DMGroupChannel - BOTS can't join these. :(
				break;
			case 4:
				return new GuildChannelCategory(data, client);
				break;
			case 5:
				return new GuildNewsChannel(data, client);
				break;
			case 6:
				return new GuildStoreChannel(data, client);
				break;
			default:
				return new Channel(data, client);
				break;
		}
	}
}
