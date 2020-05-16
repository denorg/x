import { Client } from "../Client.ts";
import { User } from "./User.ts";

/** Class representing a guild member */
export class GuildMember {
	public user: User;
	public nick: string;
	public roles: Array<string>; // TODO(fox-cat): role objects
	public joinedAt: string;
	public premiumSince: string;
	public deaf: boolean;
	public mute: boolean;

	constructor(data: any, client: Client) {
		this.user = new User(data.user, client);
		this.nick = data.nick || null;
		this.roles = data.roles;
		this.joinedAt = data.joinedAt;
		this.premiumSince = data.premiumSince || null;
		this.deaf = data.deaf;
		this.mute = data.mute;
	}
}
