export class MysqlClient {
	
	private config: any;
	private db: any;
	private lib: any;
	
	constructor(config: any) {
		this.config = config;
	}
	
	public async connect() {
		this.lib = await import("./libs/mysql/mod.ts");
		
		this.db = await new this.lib.Client().connect({
			hostname: this.config.connection.host,
			username: this.config.connection.user,
			db: this.config.connection.database,
			password: this.config.connection.password,
			port: this.config.connection.port,
		});
	}
	
	public async execute(query: string) : Promise<any> {
		return await this.db.execute(query);
	}
	
	public async close() {
		await this.db.close();
	}
	
}
