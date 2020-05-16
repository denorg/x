import { resolve } from "path";
import { smart as merge } from "webpack-merge";
import prod from "./webpack.config.prod";

/** @public */
const config = merge(prod, {
	output: {
		path: resolve(__dirname, "test/web"),
	},
});

export default config;
