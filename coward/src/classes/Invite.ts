import { Channel, User, Guild } from "../Classes.ts";
import { Client } from "../Client.ts";

export class Invite {
	public code: string;
	public guild?: Guild;
	public channel: Channel;
	public inviter?: User;

	constructor(data: any, client: Client) {
		this.code = data.code;
		if (data.guild) this.guild = new Guild(data.guild, client);
		if (data.inviter) this.inviter = new User(data.inviter, client);
		this.channel = new Channel(data.channel, client);
	}
}
