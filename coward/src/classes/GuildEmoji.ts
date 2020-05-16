import { Client } from "../Client.ts";
import { Role, User } from "../Classes.ts";

/** Class representing an emoji in a guild */
export class GuildEmoji {
	public id: string;
	public name: string;
	public roles: Map<string, Role> = new Map<string, Role>();
	/** User that created the emoji */
	public user: User | undefined;
	public requireColons: boolean;
	/** Whether the emoji is managed */
	public managed: boolean;
	public animated: boolean;
	/** Whether the emoji is available - may be false due to loss of server boosts. */
	public available: boolean;

	constructor(data: any, client: Client) {
		this.id = data.id;
		this.name = data.name;
		if(data.roles) {
			for(const r of data.roles) {
				this.roles.set(r.id, new Role(r, client));
			}
		}
		if(this.user) this.user = new User(data.user, client) || null;
		this.requireColons = data.require_colons;
		this.managed = data.managed;
		this.animated = data.animated || false;
		this.available = data.available;
	}
}
