import { renderFile } from "../deps.ts";
import { ensureDir } from "https://deno.land/std@0.51.0/fs/ensure_dir.ts";
import { exists } from "https://deno.land/std@0.51.0/fs/exists.ts";
// import { emptyDir } from "https://deno.land/std@0.51.0/fs/empty_dir.ts";
import { IUserChoice, askToOverwriteExistingFiles } from "./prompts.ts";
import { join, dirname } from "https://deno.land/std@0.51.0/path/mod.ts";

const { writeTextFile, remove } = Deno;

let currentDir = dirname(new URL(import.meta.url).pathname);

const readerToString = async (reader: Deno.Reader) =>
  new TextDecoder().decode(await Deno.readAll(reader));

export const getTemplatedFile = async (
  file: string,
  opts: object,
): Promise<string> => {
  const absoluteFilePath = join(
    dirname(new URL(import.meta.url).pathname),
    "content",
    file,
  );
  return await readerToString(await renderFile(absoluteFilePath, opts));
};

function getWriteDirectory(): string {
  const env = Deno.env.get("DENO_ENV");
  if (env === "test") {
    return join(
      currentDir,
      "../test/fixtures",
    );
  } else if (env === "development") {
    return join(
      currentDir,
      "../tmp",
    );
  } else {
    return join(Deno.cwd());
  }
}

export async function writeTemplatedFile(
  filePath: string,
  content: string,
): Promise<void> {
  const writePath = join(getWriteDirectory(), filePath);
  const parentDirname = dirname(writePath);
  await ensureDir(parentDirname);

  await writeTextFile(writePath, content);
}

export async function writeStarterFiles(
  userChoice: IUserChoice,
  templateOptions: object,
): Promise<void> {
  const appString = await getTemplatedFile(
    `${userChoice.webFramework}/src/app.ejs`,
    templateOptions,
  );
  const serverString = await getTemplatedFile(
    `${userChoice.webFramework}/src/server.ejs`,
    templateOptions,
  );

  let ext = userChoice.language === "typescript" ? "ts" : "js";
  await writeTemplatedFile(`src/app.${ext}`, appString);
  await writeTemplatedFile(`src/server.${ext}`, serverString);
}

interface ITemplateOptions {
  nl: string;
  main: string;
  flags: boolean;
  isTs: boolean;
  framework?: string;
  allow?: {
    read: boolean;
    write?: boolean;
    run?: boolean;
    net?: boolean;
    env?: boolean;
    hwrim?: boolean;
  };
}

export function createTemplateOptions(
  userChoice: IUserChoice,
): ITemplateOptions {
  const templateDefaults = {
    nl: "\n",
    main: "src/main.ts",
    flags: false,
    isTs: true,
    allow: {
      read: false,
      write: false,
      net: false,
    },
  };

  let templateOptions;
  if (userChoice.webFramework) {
    templateOptions = {
      ...templateDefaults,
      main: "src/server.ts",
      isTs: userChoice.language === "typescript",
      framework: userChoice.webFramework,
      allow: {
        read: true,
        net: true,
        env: true,
      },
    };
  } else {
    templateOptions = {
      ...templateDefaults,
    };
  }

  return templateOptions;
}

const ourFiles = [
  "scripts.yaml",
  "src/app.ts",
  "src/server.ts",
  "src/app.js",
  "src/server.js",
];
export async function promptForOverwrite(): Promise<void> {
  const dir = getWriteDirectory();

  for (const fileRel of ourFiles) {
    const fileAbs = join(dir, fileRel);
    if (await exists(fileAbs)) {
      const isOverwrite = await askToOverwriteExistingFiles(`./${fileRel}`);
      if (isOverwrite) {
        await remove(fileAbs, { recursive: false });
      }
    }
  }
}
