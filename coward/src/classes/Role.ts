import { Client } from "../Client.ts";

/** Class representing a Role */
export class Role {
	public id: string;
	public name: string;
	public color: number;
	public hoist: boolean;
	public managed: boolean;
	public mentionable: boolean;

	constructor(data: any, client: Client) {
		this.id = data.id;
		this.name = data.name;
		this.color = data.color;
		this.hoist = data.hoist;
		this.managed = data.managed;
		this.mentionable = data.mentionable;
	}
}
