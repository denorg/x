import { Spinner } from "./deps.ts";
import { getColorEnabled, cyan } from "https://deno.land/std@0.51.0/fmt/colors.ts";
import { promptUser } from "./src/prompts.ts";
import type { IUserChoice } from "./src/prompts.ts";
import {
  getTemplatedFile,
  promptForOverwrite,
  createTemplateOptions,
  writeStarterFiles,
  writeTemplatedFile,
} from "./src/template.ts";

const { exit } = Deno;

if (!import.meta.main) console.log("something happened"), exit(1);

let print = (text: string): void =>
  getColorEnabled() ? console.log(cyan(text)) : console.log(text);

print(`
_,-=._              /|_/|
  \`-.}   \`=._,.-=-._.,  @ @._,
     \`._ _,-.   )      _,.-'
        \`    G.m-"^m\`m'
`);
print(
  "Haii!! This foxxo will help you bootstrap a Deno web project. Answer some questions, and your project will be created! ^w^",
);

const userChoice: IUserChoice = await promptUser();
await promptForOverwrite();
const templateOptions = createTemplateOptions(userChoice);

let string = await getTemplatedFile(
  "scripts.yaml.ejs",
  templateOptions,
);
await writeTemplatedFile("scripts.yaml", string);

await writeStarterFiles(userChoice, templateOptions);

const spinner = Spinner.getInstance();
spinner.setSpinnerType("bouncingBar");
spinner.start("^w^ useless loading spinner! 🦊");
globalThis.setTimeout(async () => {
  spinner.setText("okiii done!");
  await spinner.stop();
}, 1200)

print(`project generated in your working directory! notice a problem? - post a bug report on github: https://github.com/eankeen/fox`)
exit(0)
