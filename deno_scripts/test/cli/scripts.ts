import { Scripts } from "../../mod.ts";

Scripts(
  {
    echo: {
      run: "echo hello world",
    },
    log: {
      file: "./echo.ts",
    },
  },
  {
    debug: true,
  }
);
