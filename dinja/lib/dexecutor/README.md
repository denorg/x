# Dexecutor: An SQL Query Executor for Deno

Dexecutor is an SQL query executor that makes it very easy to connect to and execute queries on various SQL databases. The following databases are currently supported:

 * Sqlite3
 * MySQL
 * MariaDB
 * Postgres

Dexecutor only provides connection and query execution functions. To actually build queries, use the [Dex SQL Query Builder](https://deno.land/x/dex) library.

## Usage

Below is a very basic example of the syntax for creating an database client, connecting to a database, executing a query, and closing the connection:

```typescript
import Dexecutor from "https://raw.githubusercontent.com/denjucks/dexecutor/master/mod.ts";

// Creating the query executor client
let dexecutor = new Dexecutor({
	client: "sqlite3",
	connection: {
		filename: "test.db"
	}
});

// Opening the connection
await dexecutor.connect();

// Executing a query
await dexecutor.execute("SELECT * FROM MyTable");

// Closing the connection
await dexecutor.close();
```

Dexecutor works well with the Dex library. Dex allows you to build queries, while Dexecutor handles the execution of queries. Here is an example of using Dex and Dexecutor to create and execute queries that create tables, insert data into tables, select data from tables, and finally dropping tables.

```typescript
import Dex from "https://deno.land/x/dex/mod.ts";
import Dexecutor from "https://raw.githubusercontent.com/denjucks/dexecutor/master/mod.ts";

const client = "sqlite3";

let dex = new Dex({
	client: client
});

// Creating the query executor
let dexecutor = new Dexecutor({
	client: client,
	connection: {
		filename: "test.db"
	}
});


// Opening the connection
await dexecutor.connect();


let sqlQuery;

// CREATE TABLE Query
sqlQuery = dex.schema.createTable("people", (table) => {
	table.string('name');
}).toString();

await dexecutor.execute(sqlQuery);


// INSERT Query
sqlQuery = dex.queryBuilder()
	.insert([
		{name: "hello"},
		{name: "deno"},
		{name: "world"},
	])
	.into("people")
	.toString();

await dexecutor.execute(sqlQuery);


// SELECT Query
let result = await dexecutor.execute(
	dex.queryBuilder()
		.select("*")
		.from("people")
		.toString()
);

console.log(result);


// DROP TABLE Query
sqlQuery = dex.schema.dropTable("people").toString();

await dexecutor.execute(sqlQuery);


// Closing the connection
await dexecutor.close();
```

We can use the exact same code above to connect, execute, and close the connection for other databases as well. Here is an example of the configuration for a MySQL/MariaDB database:

```typescript
import Dex from "https://deno.land/x/dex/mod.ts";
import Dexecutor from "https://raw.githubusercontent.com/denjucks/dexecutor/master/mod.ts";

const client = "mysql";

let dex = new Dex({
	client: client
});

// Creating the query executor
let dexecutor = new Dexecutor({
	client: client,
	connection: {
		host: "your_hostname",
		user: "your_username",
		password: "your_password",
		port: 3306,
		database: "your_database_name",
});
```

With this new configuration, you can run the exact same example as above without having to change any other code. Dex will create queries using MySQL/MariaDB style SQL now and and Dexecutor will use a driver that can connect to those databases.

Dexecutor also supports Postgres. Below is an example of the configuration for a Postgres database:

```typescript
import Dex from "https://deno.land/x/dex/mod.ts";
import Dexecutor from "https://raw.githubusercontent.com/denjucks/dexecutor/master/mod.ts";

const client = "postgres";

let dex = new Dex({
	client: client
});

// Creating the query executor
let dexecutor = new Dexecutor({
	client: client,
	connection: {
		host: "your_hostname",
		user: "your_username",
		password: "your_password",
		port: 5432,
		database: "your_database_name",
});
```
