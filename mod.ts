import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
const { run } = Deno;

const DATABASE_URL =
  "https://raw.githubusercontent.com/denoland/deno_website2/master/database.json";

export async function downloadProjects(): Promise<void> {
  console.log("Fetching database", DATABASE_URL);
  const database: {
    [index: string]: {
      type: "github" | "gitlab";
      owner: string;
      repo: string;
      desc?: string;
    };
  } = await (await fetch(DATABASE_URL)).json();
  await ensureDir(join(".", "public"));
  for await (const key of Object.keys(database)) {
    const project = database[key];
    const DOWNLOAD_URL =
      `https://${project.type}.com/${project.owner}/${project.repo}.git`;
    console.log("Downloading package", key);
    const cloner = run({
      cmd: ["git", "clone", DOWNLOAD_URL, `public/${key}`],
      stdout: "inherit",
    });
    await cloner.status();
    break;
  }
}

downloadProjects();
