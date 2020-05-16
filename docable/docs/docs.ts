import Drash from "https://deno.land/x/drash@v0.8.2/mod.ts";
import Docable from "../mod.ts";
import * as ResponseService from "./src/response_service.ts";

const Decoder = new TextDecoder();
const Encoder = new TextEncoder();
const DOCABLE_DIR_ROOT = Deno.env().DOCABLE_DIR_ROOT
const compiler = new Docable.Compilers.JsonCompiler();

class AppResource extends Drash.Http.Resource {
  static paths = ["*"];
  public GET() {
    return this.response;
  }
}

class AppResponse extends Drash.Http.Response {
  public indexEjsFile = Deno.env().DOCABLE_DIR_ROOT + "/docs/src/templates/index.ejs";
  public async send(): Promise<any> {
    let body;
    switch (this.headers.get("Content-Type")) {
      // Handle HTML
      case "text/html":
        console.log("Rendering HTML response.");
        try {
          body = await ResponseService.getAppDataInHtml(this.indexEjsFile);
        } catch (error) {
          console.log("WTF... tried rendering index.ejs");
          console.log("Error below:");
          console.log(error);
          let error500template = `<!DOCTYPE html>
<html class="w-full h-full">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
    <title>Docable</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"/>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="w-full h-full">
    <div class="flex justify-center w-full h-full">
      <div class="self-center max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src="/public/assets/img/meme-congrats-you-fucked-up.jpg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Error</div>
          <p class="text-grey-darker text-base">${error}</p>
        </div>
        <div class="px-6 py-4">
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#haha</span>
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#dang</span>
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#fixme</span>
        </div>
      </div>
    </div>
  </body>
</html>
`;
          body = error500template;
        }
        break;
    }

    this.request.respond({
      status: this.status_code,
      headers: this.headers,
      body: new TextEncoder().encode(body)
    });
  }
}
Drash.Http.Response = AppResponse;

compileApiReferencePageData();
compileVueGlobalComponents();
compileVueRouterRoutes();
runServer();

// FILE MARKER: FUNCTIONS //////////////////////////////////////////////////////

/**
 * Compile the API Reference page data.
 */
function compileApiReferencePageData() {
  let DocableNamespaceMembers = [
    "/src/compilers/json_compiler.ts"
  ].map(value => {
    return DOCABLE_DIR_ROOT + value;
  });
  console.log("[docs.ts] Compiling API Reference page data using doc blocks...");
  let compiled = compiler.compile(DocableNamespaceMembers);
  let apiReferenceData = Encoder.encode(JSON.stringify(compiled, null, 4));
  const apiReferenceOutputFile = `${DOCABLE_DIR_ROOT}/docs/public/assets/json/api_reference.json`;
  Deno.writeFileSync(apiReferenceOutputFile, apiReferenceData);
  console.log(`    Done. API Reference page data was written to:\n    ${apiReferenceOutputFile}.`);
}

/**
 * Compile the global components to be used by Vue.
 */
function compileVueGlobalComponents() {
  console.log("[docs.ts] Compiling Vue global components...");
  let vueRouterComponentPaths = [];
  let vueRouterComponents = Deno.readDirSync(`${DOCABLE_DIR_ROOT}/docs/src/vue/components/global`);
  function iterateDirectoryFiles(store, files) {
    files.forEach(file => {
      if (file.isFile()) {
        store.push({
          name: file.name.replace(".", "_"), // change name from filename.vue to filename_vue
          path: file.path
        });
      } else {
        iterateDirectoryFiles(store, Deno.readDirSync(file.path));
      }
    });
  }
  iterateDirectoryFiles(vueRouterComponentPaths, vueRouterComponents);
  let importString = `import Vue from "vue";\n\n`;
  vueRouterComponentPaths.forEach(pathObj => {
    let componentName = pathObj.name.replace("_vue", "").replace(/_/g, "-");
    importString += `import ${pathObj.name} from "${pathObj.path}";\nVue.component("${componentName}", ${pathObj.name});\n\n`;
  });
  let outputFile = `${DOCABLE_DIR_ROOT}/docs/public/assets/js/compiled_vue_global_components.js`;
  Deno.writeFileSync(outputFile, Encoder.encode(importString));
  console.log(`    Done. Vue global components were written to:\n    ${outputFile}.`);
}

/**
 * Compile the routes to be used by Vue Router.
 */
function compileVueRouterRoutes() {
  console.log("[docs.ts] Compiling vue-router routes...");
  let vueRouterComponentPaths = [];
  let vueRouterComponents = Deno.readDirSync(`${DOCABLE_DIR_ROOT}/docs/src/vue/components/pages`);
  function iterateDirectoryFiles(store, files) {
    files.forEach(file => {
      if (file.isFile()) {
        store.push({
          name: file.name.replace(".", "_"), // change name from filename.vue to filename_vue
          path: file.path
        });
      } else {
        iterateDirectoryFiles(store, Deno.readDirSync(file.path));
      }
    });
  }
  iterateDirectoryFiles(vueRouterComponentPaths, vueRouterComponents);
  let importString = "";
  vueRouterComponentPaths.forEach(pathObj => {
    importString += `import * as ${pathObj.name} from "${pathObj.path}";\n`;
  });
  importString += "\nexport default [\n";
  vueRouterComponentPaths.forEach(pathObj => {
    importString += `  ${pathObj.name},\n`;
  });
  importString += "];";
  let outputFile = `${DOCABLE_DIR_ROOT}/docs/public/assets/js/compiled_routes.js`;
  Deno.writeFileSync(outputFile, Encoder.encode(importString));
  console.log(`    Done. vue-router routes were written to:\n    ${outputFile}.`);
}

/**
 * Run the Drash server.
 */
function runServer() {
  console.log("[docs.ts] Starting server...");
  let server = new Drash.Http.Server({
    address: "localhost:8050",
    response_output: "text/html",
    logger: new Drash.Loggers.ConsoleLogger({
      enabled: true,
      level: "debug",
      tag_string: "{level} | "
    }),
    resources: [AppResource],
    static_paths: ["/public"]
  })
  server.run();
}
