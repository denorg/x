import { ensureDir, writeFileStr } from "https://deno.land/std/fs/mod.ts";
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
  await writeFileStr(join(".", "public", "CNAME"), "x.den.org.in");

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
    await Deno.remove(join(".", "public", key, ".git"), { recursive: true });
    break;
  }

  const html = `<!doctype html>
<html>
  <head>
    <title>x.den.org.in</title>
    <style>
      html { font-family: sans-serif }
      body { margin: 10vh auto; max-width: 500px }
      ul { line-height: 2 }
    </style>
  </head>
  <body>
    <h1>x.den.org.in</h1>
    <p>Mirror of deno.land/x for third-party Deno modules</p>
    <ul>
  ${
    Object.keys(database)
      .map((key) => `<li><a href="./${key}/README.md">${key}</a></li>`)
      .join("\n")
  }
    </ul>
  </body>
</html>`;
  await writeFileStr(join(".", "public", "index.html"), html);
}

downloadProjects();
