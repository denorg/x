
function log(message: string) {
	console.log(`[deno-env][DEBUG] ${message}`)
}

/**
 * Variables defined on .env file or environment.
 */

export interface DotEnvVariables {
	[name: string]: string;
}


/**
 * Options to change dotenv's default behavior. Like change .env file path.
 */

export interface DotEnvOptions {
	path?: string;
	debug?: boolean;
	setEnv?: boolean;
	encoding?: string;
}

const LINE_BREAK = /\r\n|\n|\r/;
const DECLARATION = /^\s*(\w+)\s*\=\s*(.*)?\s*$/;

/**
 * Parse the source of a `.env` file into an object with the variables.
 */
export function parse(source: string): DotEnvVariables {
	const lines = source.split(LINE_BREAK);
	return lines.reduce((vars: DotEnvVariables, line: string) => {
		if (!DECLARATION.test(line))
			return vars;

		const [, name, value] = DECLARATION.exec(line)!;

		if (!value)
			vars[name] = "";
		else if (/^".*"$/.test(value))
			vars[name] = value.replace(/^\"(.*)\"$/, "$1").replace(/\\n/g, "\n");
		else
			vars[name] = value;

		return vars;
	}, {} as DotEnvVariables);
}



/**
 * Read `.env` file from project's root. Merge it's variables with environment
 * ones and return it.
 * @example
 * db.connect(env.DB_USERNAME, env.DB_PASSWORD);
 */
export function config({ path = `${Deno.cwd() }/.env` , debug = false, encoding= 'utf-8', setEnv= true}: DotEnvOptions = {}) {

	const file = Deno.readFileSync(path);
	const decoder = new TextDecoder(encoding);
	const dotEnvs = parse(decoder.decode(file));

	if (setEnv){
	Object.keys(dotEnvs).forEach(function (key: any) {
		if (!Deno.env.get(key)) {
			Deno.env.set(key, dotEnvs[key])
		} else if (debug) {
			log(`"${key}" is already defined in \`Deno.env\` and will not be overwritten`)
		}
	})
}


	return dotEnvs

}
