import { Client } from "../Client.ts"
import { Permissions, Versions, Discord, Endpoints } from "../util/Constants.ts";

export class RequestHandler {
	private _userAgent: string = `DiscordBot (https://github.com/fox-cat/coward), ${Versions.THIS}`;

	constructor(private _client: Client) {};

	public async request(method: string, url: string, data?: any) {
		let headers: {[k: string]: any} = {
			"User-Agent": this._userAgent,
			"Authorization": "Bot " + this._client.token,
		}

		let body;

		if(data !== undefined) {
			if(data.file) {
				let form = new FormData();

				form.append("file", data.file.file, data.file.name);
				console.log(data.file.file["Symbol"]);
				delete data.file;
				if(data !== undefined) {
					form.append("payload_json", data);
				}
				body = form;
			} else {
				body = JSON.stringify(data);
				headers["Content-Type"] = "application/json";
			}
		}

		const response = await fetch(Discord.API + url, {
			method: method,
			headers: headers,
			body: body
		});

		switch(response.status) {
			case 400: case 401: case 403: case 404: case 405: case 429:
			case 502: case 500: case 503: case 504: case 507: case 508:
				const json = await response.json();
				if(json.code)
					{ throw new Error(response.status + ", " + json.code + ", " + json.message); }
				else
					{ throw new Error(response.status + ", " + response.statusText); }
				break;
			case 204:
				return null;
				break;
			default:
				return response.json();
				break;
		}
	}
}
