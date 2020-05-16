import { Client } from "../Client.ts";
import {
	User,
	GuildTextChannel,
	DMChannel,
	GuildVoiceChannel,
	GuildChannelCategory,
	GuildNewsChannel,
	GuildStoreChannel,
	GuildMember
} from "../Classes.ts";

/** Class representing a message */
export class Message {
	public id: string;
	public content: string;
	public channel: GuildTextChannel | DMChannel | GuildNewsChannel;
	public author: User;
	public timestamp: string;

	constructor(data: any, client: Client) {
		this.id = data.id;
		this.content = data.content;
		var channel: any;
		var guildID: any = client.channelGuildIDs.get(data.channel_id);
		var guild: any = client.guilds.get(guildID);
		if(guild != undefined) { channel = guild.channels.get(data.channel_id); }
		else { channel = client.dmChannels.get(data.channel_id); }
		this.channel = channel;
		this.author = new User(data.author, client);
		this.timestamp = data.timestamp;
	}
}
