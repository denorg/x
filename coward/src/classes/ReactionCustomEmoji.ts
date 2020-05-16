import { Client } from "../Client.ts";
import { ReactionStandardEmoji } from "../Classes.ts";

/**
 * Class representing a custom reaction emoji
 * @extends ReactionStandardEmoji
 */
export class ReactionCustomEmoji extends ReactionStandardEmoji {
	public animateable: boolean;

	constructor(data: any, client: Client) {
		super(data, client);
		this.animateable = data.animateable || false;
	}
}
