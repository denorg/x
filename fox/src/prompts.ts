import { Select, Confirm } from "../deps.ts";
import type { starterWebFrameworkNames } from "./@types/defs.d.ts";

const { exit } = Deno;

export interface IUserChoice {
  language: string;
  isWebFramework: boolean;
  webFramework: string | undefined;
}

export async function promptUser(): Promise<IUserChoice> {
  const languageRaw: string | undefined = await Select.prompt({
    message: "What is your language of choice?",
    options: [
      { value: "typescript", name: "Typescript (recommended)" },
      { value: "javascript", name: "Javascript" },
    ],
  });

  const webFrameworkOptions = [
    { value: "oak", name: "Oak (github.com/oakserver/oak) (>620 stars)" },
    { value: "abc", name: "abc (github.com/zhmushan/abs) (>216 stars)" },
    { value: "pogo", name: "pogo (github.com/sholladay/pogo) (>140 stars)" },
  ];
  if (languageRaw === "typescript") {
    webFrameworkOptions.push({
      value: "alosaur",
      name: "Alosaur (github.com/alosaur/alosaur) (>131 stars)",
    });
  }
  const webFrameworkRaw: string | undefined = await Select.prompt({
    message: "What is your choice of web framework?",
    options: webFrameworkOptions,
  });

  if (!languageRaw) {
    console.info("Somehow, the programming language was not chosen");
    exit(1);
  }
  if (!webFrameworkRaw) {
    console.info("Somehow, the web framework was not chosen!");
    exit(1);
  }

  let language: "javascript" | "typescript" = <
    | "javascript"
    | "typescript"
  > languageRaw;
  let webFramework: starterWebFrameworkNames =
    <starterWebFrameworkNames> webFrameworkRaw;

  return {
    language,
    isWebFramework: true,
    webFramework,
  };
}

export async function askToOverwriteExistingFiles(
  fileRes: string,
): Promise<boolean> {
  const willOverwrite = await Confirm.prompt(
    `It looks like '${fileRes}' already exists! :0 Remove it?`,
  );
  if (!willOverwrite) {
    throw new Error("somehow, the prompt returned undefined");
  }
  return willOverwrite;
}
