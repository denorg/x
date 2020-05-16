import {
	connectWebSocket,
	isWebSocketCloseEvent,
	WebSocket,

	green, red, blue, bold, reset
} from "../../deps.ts";
import { Versions, Discord, Endpoints } from "../util/Constants.ts";
import { fear } from "../util/Fear.ts";

import { Client } from "../Client.ts";
import { Guild, GuildMember, Message, User, Role, Channel } from "../Classes.ts";

export default class Gateway {
	public sock!: WebSocket;
	private sequence: any = null;

	constructor(private token: string, private client: Client) {}

	public async connect(): Promise<void> {
		try {
			this.sock = await connectWebSocket(`${Discord.GATEWAY}/v=${Versions.GATEWAY}`);
			fear("debug", "successfully connected to websocket");

			for await (const msg of this.sock) {
				if (typeof msg === "string") {
					this.handleWSMessage(JSON.parse(msg));
				} else if (isWebSocketCloseEvent(msg)) {
					fear("debug", "websocket was closed");
					this.onClose(msg);
				}
			}
		} catch (err) {
			fear("error", "could not connect to websocket \n" + red(err.stack))
		}
	}

	private heartbeat(int: any) {
		setInterval(() => {
			this.sock.send(JSON.stringify({
				op: 1,
				d: this.sequence,
			}));
		}, int);
	}

	private async identify() {
		await this.sock.send(JSON.stringify({
			op: 2,
			d: {
				token: this.token,
				properties: {
					"$os": "linux",
					"$browser": "coward",
					"$device": "coward",
				},
			},
		}));
	}

	private async handleWSMessage(message: any) {
		switch (message.op) {
			case 0:
				this.sequence = message.s;
				break;
			case 1:
				this.sock.send(JSON.stringify({
					op: 1,
					d: this.sequence,
				}));
				break;
			case 10:
				this.heartbeat(message.d.heartbeat_interval);
				this.identify();
				break;
		}

		switch(message.t) {
			case "READY": {
				/**
				 * Fired when the Client is ready
				 * @event Client#ready
				 */
				this.client.emit("ready", null);
				break;
			}
			case "CHANNEL_CREATE":{
				/**
				 * Fired when a Channel is created.
				 * @event Client#channelCreate
				 */
				this.client.emit("channelCreate", Channel.from(message.d, this.client));
				break;
			}
			case "CHANNEL_UPDATE":{
				/**
				 * Fired when a Channel is updated.
				 * @event Client#channelUpdate
				 */
				this.client.emit("channelUpdate", Channel.from(message.d, this.client));
				break;
			}
			case "CHANNEL_DELETE":{
				/**
				 * Fired when a Channel is deleted.
				 * @event Client#channelDelete
				 */
				this.client.emit("channelDelete", Channel.from(message.d, this.client));
				break;
			}
			// TODO: CHANNEL_PINS_UPDATE
			case "GUILD_CREATE": {
				/**
				 * Fired when
				 *	- The client is initally connecting.
				 *	- A guild becomes available to the client.
				 *	- The client joins a guild.
				 * @event Client#guildCreate
				 */
				let guild = new Guild(message.d, this.client);
				this.client.guilds.set(guild.id, guild);
				this.client.emit("guildCreate", guild);
				break;
			}
			case "GUILD_DELETE":{
				/**
				 * Fired when
				 *	- The client leaves or is removed from a guild.
				 *	- A guild becomes unavailable.
				 * @event Client#guildDelete
				 */
				let guild = new Guild(message.d, this.client);
				this.client.guilds.delete(guild.id);
				this.client.emit("guildDelete", new Guild(message.d, this.client));
				break;
			}
			case "GUILD_BAN_ADD":{
				/**
				 * Fired when a user is banned from the guild.
				 * @event Client#guildBanAdd
				 */
				this.client.emit("guildBanAdd", this.client.guilds.get(message.d.guild_id), new User(message.d.user, this.client));
				break;
			}
			case "GUILD_BAN_REMOVE":{
				/**
				 * Fired when a user is unbanned from the guild.
				 * @event Client#guildBanAdd
				 */
				this.client.emit("guildBanRemove", this.client.guilds.get(message.d.guild_id), new User(message.d.user, this.client));
				break;
			}
			case "GUILD_EMOJIS_UPDATE":{
				//TODO: GUILD_EMOJIS_UPDATE
				break;}
			case "GUILD_INTEGRATIONS_UPDATE":{
				//TODO: GUILD_INTEGRATIONS_UPDATE
				break;
			}
			case "GUILD_MEMBER_ADD":{
				/**
				 * Fired when a new user joins the guild.
				 * @event Client#guildMemberAdd
				 */
				let guild = this.client.guilds.get(message.d.guild_id);
				if(guild != undefined) {
					let member = new GuildMember(message.d, this.client);
					guild.members.set(member.user.id, member);
					this.client.guilds.set(guild.id, guild);
					this.client.emit("guildMemberAdd", guild, member);
				}
				break;
			}
			case "GUILD_MEMBER_REMOVE":{
				/**
				 * Fired when a user leaves or is removed from the guild.
				 * @event Client#guildMemberRemove
				 */
				let guild = this.client.guilds.get(message.d.guild_id);
				if(guild != undefined) {
					let member = guild.members.get(message.d.user.id);
					if(member != undefined) {
						guild.members.delete(member.user.id);
						this.client.guilds.set(guild.id, guild);
						this.client.emit("guildMemberRemove", guild, member);
					}
				}
				break;
			}
			case "GUILD_MEMBER_UPDATE":{
				// TODO: https://discord.com/developers/docs/topics/gateway#guild-member-update
				break;
			}
			case "GUILD_MEMBERS_CHUNK":{
				// TODO: https://discord.com/developers/docs/topics/gateway#guild-members-chunk
				break;
			}
			case "GUILD_ROLE_CREATE":{
				/**
				 * Fired when a role is created in a guild.
				 * @event Client#guildRoleCreate
				 */
				this.client.emit("guildRoleCreate", message.d.guild_id, new Role(message.d.role, this.client));
				break;
			}
			case "GUILD_ROLE_UPDATE":{
				/**
				 * Fired when a role is deleted in a guild.
				 * @event Client#guildRoleUpdate
				 */
				this.client.emit("guildRoleUpdate", message.d.guild_id, new Role(message.d.role, this.client));
				break;
			}
			case "GUILD_ROLE_DELETE":{
				/**
				 * Fired when a role is deleted in a guild.
				 * @event Client#guildRoleDelete
				 */
				this.client.emit("guildRoleDelete", message.d.guild_id, message.d.role_id);
				break;
			}
			case "INVITE_CREATE":{
				//TODO: https://discord.com/developers/docs/topics/gateway#invite-create
				break;
			}
			case "INVITE_DELETE":{
				//TODO: https://discord.com/developers/docs/topics/gateway#invite-delete
				break;
			}
			case "MESSAGE_CREATE":{
				/**
				 * Fired when a message is created
				 * @event Client#messageCreate
				 */
				this.client.emit("messageCreate", new Message(message.d, this.client));
				break;
			}
			case "MESSAGE_UPDATE":{
				/**
				 * Fired when a message is updated
				 * @event Client#messageUpdate
				 */
				if(!message.d.author) break; // FIX: I'm not sure why, but sending a message with an embed attached triggers the messageUpdate event ...?
				this.client.emit("messageUpdate", new Message(message.d, this.client));
				break;
			}
			case "MESSAGE_DELETE":{
				/**
				 * Fired when a message is deleted
				 * @event Client#messageDelete
				 */
				this.client.emit("messageDelete", message.d.id, message.d.channel_id); //TODO
				break;
			}
			case "MESSAGE_DELETE_BULK":{
				/**
				 * Fired when mesages are deleted in bulk.
				 * @event Client#messageDeleteBulk
				 */
				this.client.emit("messageDeleteBulk", message.d.ids, message.d.channel_id);
				break;
			}
			case "MESSAGE_REACTION_ADD":{
				//TODO: https://discord.com/developers/docs/topics/gateway#message-reaction-add (and all other reactions)
				break;
			}
			//TODO: All other ones lol
		}
	}

	private async onClose(message: any) {
		if (message.code) {
			switch (message.code) {
				case 4000:
					fear("error",
						"Unkown Error: We're not sure what went wrong. Try reconnecting?",
					);
					break;
				case 4001:
					fear("error",
						"Unknown Opcode: You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!",
					);
					break;
				case 4002:
					fear("error",
						"Decode Error: You sent an invalid payload to us. Don't do that!",
					);
					break;
				case 4003:
					fear("error",
						"Not Authenticated: You sent us a payload prior to identifying.",
					);
					break;
				case 4004:
					fear("error",
						`Authentication Failed: The account token sent with your identify payload is incorrect. (${this.token})`,
					);
					break;
				case 4005:
					fear("error",
						"Already Authenticated: You sent more than one identify payload. Don't do that!",
					);
					break;
				case 4007:
					fear("error",
						"Invalid `seq`: The sequence sent when resuming the session was invalid. Reconnect and start a new session.",
					);
					break;
				case 4008:
					fear("error",
						"Rate Limited: Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this.",
					);
					break;
				case 4009:
					fear("error",
						"Session Timed Out: Your session timed out. Reconnect and start a new one.",
					);
					break;
				case 4010:
					fear("error",
						"Invalid Shard: You sent us an invalid shard when identifying.",
					);
					break;
				case 4011:
					fear("error",
						"Sharding Required: The session would have handled too many guilds - you are required to shard your connection in order to connect.",
					);
					break;
				case 4012:
					fear("error",
						"Invalid API Version: You sent an invalid version for the gateway.",
					);
					break;
				case 4013:
					fear("error",
						"Invalid Intent(s): You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value.",
					);
					break;
				case 4014:
					fear("error",
						"Disallowed Intent(s): You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not whitelisted for.",
					);
					break;
			}
		}
		if (!this.sock.isClosed) this.sock.close(1000);
	}
}
