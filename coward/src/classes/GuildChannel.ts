import { Client } from "../Client.ts";
import {
	Message,
	Channel,
	Guild,
	GuildTextChannel,
	GuildVoiceChannel,
	GuildChannelCategory,
	GuildNewsChannel,
	GuildStoreChannel
} from "../Classes.ts";

/**
 * Class representing a channel in a guild
 * @extends Channel
 */
export class GuildChannel extends Channel {
	public name: string;
	public position: number;
	public nsfw: boolean;
	public parentID: string; // TODO(fox-cat): channel category object ????
	//public permission_overwrites: Array<>; // TODO(fox-cat): this whole thing
	protected _guildID: any;

	constructor(data: any, client: Client) {
		super(data, client);

		this.name = data.name;
		this.position = data.position;
		this.nsfw = data.nsfw;
		this.parentID = data.parent_id || null;
		this._guildID = client.channelGuildIDs.get(this.id);
		//TODO: this.permission_overwrites = data.permission_overwrites;
	}

	get guild(): Guild | undefined {
		return this._client.guilds.get(this._guildID);
	}

	static from(data: any, client: Client) {
		switch(data.type) {
			case 0:
				return new GuildTextChannel(data, client);
				break;
			case 2:
				return new GuildVoiceChannel(data, client);
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
				return new GuildChannel(data, client);
				break;
		}
	}
}
