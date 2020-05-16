// Usage: deno --allow-env --allow-run example/example.ts <task name>
import { task } from "../mod.ts";

task("prepare", "echo preparing...");
task("counter", "deno ./example/counter.ts");
task("all", "$prepare", ["$counter alice", "$counter bob"]);
task("start", "echo changed", "$all").watchSync(".");

task("server", "deno ./example/server.ts");
task("dev", "echo restarting...", "$server").watch(".");
