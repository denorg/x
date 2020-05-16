import Drash from "https://deno.land/x/drash@v0.8.2/mod.ts";
import { renderFile } from "https://deno.land/x/dejs/dejs.ts";
const Decoder = new TextDecoder();
const Encoder = new TextEncoder();

// FILE MARKER: FUNCTIONS - EXPORTED ///////////////////////////////////////////

export async function compile(inputFile, outputFile): Promise<any> {
  let body = await getAppDataInHtml(inputFile);
  let encoded = Encoder.encode(body);
  Deno.writeFileSync(outputFile, encoded);
}

export function getAppData() {
  const buildTimestamp = new Date().getTime();
  const env =
    Deno.env().DOCABLE_DOCS_BASE_URL == "/docable"
      ? "production"
      : "development";
  let bundleVersion = "";
  if (env == "production") {
    bundleVersion = ".min";
  }

  return {
    // The below is transferred to index.ejs
    scripts: {
      local: [
        `/public/assets/js/docable.js?version=${buildTimestamp}`,
        `/public/assets/vendor/ace/ace.js`,
        `/public/assets/vendor/prismjs/prism.js`,
        `/public/assets/js/bundle${bundleVersion}.js?version=${buildTimestamp}`
      ],
      external: ["https://unpkg.com/axios/dist/axios.min.js"]
    },
    conf: {
      base_url: Deno.env().DOCABLE_DOCS_BASE_URL
        ? Deno.env().DOCABLE_DOCS_BASE_URL
        : ""
    },

    // The below is transferred to vue_app_root.vue
    app_data: JSON.stringify({
    }) // close app_data
  };
}

export async function getAppDataInHtml(inputFile) {
  const output = await renderFile(inputFile, getAppData());
  let html = output.toString();
  return html;
}
