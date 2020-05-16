export class SqliteClient {
	
	private config: any;
	private db: any;
	private lib: any;
	
	constructor(config: any) {
		this.config = config;
	}
	
	public async connect() {
		this.lib = await import("./libs/sqlite/mod.ts");
		this.db = await this.lib.open(this.config.connection.filename);
	}
	
	public async execute(query: string) : Promise<any> {
		let queryResult = [];
		for (const row of await this.db.query(query)) {
			queryResult.push(row);
		}

		await this.lib.save(this.db);
		
		return queryResult;
	}
	
	public async close() {
		await this.db.close();
	}
	
}
