import { green } from "https://deno.land/std/fmt/colors.ts";

const DB_URL = "https://raw.githubusercontent.com/denoland/deno_website2/master/src/database.json";
const searchTerms = Deno.args;

type Pkg = {
	type?: string,
	owner?: string,
	repo?: string,
	desc?: string
};

type DenoDB = {[key: string]: Pkg};

fetch(DB_URL).then(r => r.json()).then((pkgs: DenoDB) => {
	const pkg_names = Object.keys(pkgs);
	pkg_names.forEach((name: string) => {
		searchTerms.forEach((s: string) => {
			if (pkgs[name].desc && pkgs[name].desc!.toLowerCase().indexOf(s.toLowerCase()) > -1) {
				console.log(`${green(name)} - ${pkgs[name].desc}`);
			}
		});
	});
}).catch(err => {
	console.log("Failed to fetch third-party deno packages");
	console.error(err);
});
