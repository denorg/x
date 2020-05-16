import { Tasks } from "../../../src/mod.ts";

export const tasks: Tasks = {
  clean: `rm -f 'out/*.*'`,
  build: {
    prereqs: ["src/*"],
    mapPrereqToTarget: ({ reroot }) => reroot("src", "out", "inext", "outext"),
    async onMake() {
      throw new Error(`test must override`);
    },
  },
};
