import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";

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
  for await (const project of Object.keys(database)) {
    console.log("Downloading package", project);
    await ensureDir(join(".", "public", project));
  }
}

downloadProjects();
