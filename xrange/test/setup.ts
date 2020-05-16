import { existsSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

/** @private */
const testBundlePath = resolve(__dirname, "web/xrange.bundle.js");

/** @private */
const BUNDLE_SCRIPT_ID = "xrange-bundle";

/** @private */
function loadBundle(): void {
	if (document.getElementById(BUNDLE_SCRIPT_ID))
		return;

	if (!existsSync(testBundlePath))
		execSync("npm run build:web:test", { timeout: 10000, stdio: "ignore" });

	require(testBundlePath);
}

main: {
	if (typeof window !== "undefined")
		loadBundle();
}
