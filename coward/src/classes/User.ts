import { Client } from "../Client.ts";

/** Class representing a user */
export class User {
	public id: string;
	public username: string;
	public discriminator: string;
	public bot: boolean;

	constructor(data: any, client: Client) {
		this.id = data.id;
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.bot = data.bot || false;
	}
}
