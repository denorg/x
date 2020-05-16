export default class Dexecutor {
	
	private config: any;
	private lib: any;
	private client: any;
	
	constructor(config: any) {
		this.config = config;
	}
	
	public async connect() {
		switch (this.config.client) {
			case "sqlite3":
				this.lib = await import("./clients/sqlite3.ts");
				this.client = new this.lib.SqliteClient(this.config);
				break;
				
			case "postgres":
				this.lib = await import("./clients/postgres.ts");
				this.client = new this.lib.PostgresClient(this.config);
				break;
				
			case "mysql":
				this.lib = await import("./clients/mysql.ts");
				this.client = new this.lib.MysqlClient(this.config);
				break;
		}
		
		await this.client.connect();
	}

	
	public async execute(query: string) {
		return await this.client.execute(query);
	}
	
	
	public async close() {
		await this.client.close();
	}
	
}