export class PostgresClient {
	
	private config: any;
	private db: any;
	private lib: any;
	
	constructor(config: any) {
		this.config = config;
	}
	
	public async connect() {
		this.lib = await import("./libs/postgres/mod.ts");
		
		this.db = new this.lib.Client({
			user: this.config.connection.user,
			database: this.config.connection.database,
			hostname: this.config.connection.host,
			port: this.config.connection.port,
			password: this.config.connection.password,
		});
		
		await this.db.connect();
	}
	
	public async execute(query: string) : Promise<any> {
		return await this.db.query(query);
	}
	
	public async close() {
		await this.db.end();
	}
	
}
