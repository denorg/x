import Drash from "https://deno.land/x/drash@v0.8.2/mod.ts";
import * as ResponseService from "../src/response_service.ts";

ResponseService.compile(
  Deno.env().DOCABLE_DIR_ROOT + "/docs/src/templates/index.ejs",
  Deno.env().DOCABLE_DIR_ROOT + "/docs/index.html"
);
