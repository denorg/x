import { resolve } from "path";
import type { Configuration } from "webpack";

/** @public */
const config: Configuration = {
	mode: "production",
	entry: {
		bundle: resolve(__dirname, "src/index.ts"),
	},
	resolve: {
		extensions: [ ".ts", ".js" ],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					configFile: resolve(__dirname, "tsconfig-web.prod.json"),
				},
			},
		],
	},
	output: {
		libraryTarget: "window",
		library: "xrange",
		libraryExport: "",
		path: resolve(__dirname, "dist"),
		filename: "xrange.bundle.js",
	},
};

export default config;
