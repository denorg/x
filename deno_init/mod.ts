#!/usr/bin/env deno

const { writeFile, mkdirSync, args, exit } = Deno;
import { red, bold, green } from "https://deno.land/std@v0.8.0/colors/mod.ts";

const projectName = args[1];

if (!projectName) {
  console.log(
    red("Missing directory name. Please provide a name for the directory")
  );
  console.log(green("Example: deno_init super_cool_project"));
  exit();
}

const logFileErrorMessage: any = (error: any) => {
  console.log(red("File creation failed 😓"));
  console.log(red(error.message));
};

const logFileSuccessMessage: any = (file: string) => {
  console.log(green(`✅   Created File Successfully: ${file}`));
};

try {
  mkdirSync(projectName);
  console.log(
    bold("🦕 ❤️  Thanks for initiating your project with deno_init ❤️  🦕")
  );
} catch (error) {
  console.log(red(`Couldn't create directory ${projectName}`));
  console.log(red(error.message));
  exit();
}

writeFile(
  `${projectName}/deps.ts`,
  new TextEncoder().encode(
    `/**
 * Here you import and export your dependencies for your project
 * 
 */
export { red, bold, green } from "https://deno.land/std@v0.8.0/colors/mod.ts";  
  `
  )
)
  .then(() => {
    logFileSuccessMessage("deps.ts");
  })
  .catch(error => {
    logFileErrorMessage(error);
  });

writeFile(`${projectName}/mod.ts`, new TextEncoder().encode(""))
  .then(() => {
    logFileSuccessMessage("mod.ts");
  })
  .catch(error => {
    logFileErrorMessage(error);
  });
