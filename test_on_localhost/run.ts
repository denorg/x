import {
  ServerRequest,
  Response,
} from "./deps.ts";
import {
  FileServer,
} from "./file-server.ts";
import getDefaultList from "./default-list.ts";

export interface Param {
  readonly list?: readonly string[];
  readonly onServe?: (request: ServerRequest, response: Response) => void;
  readonly port: number;
  readonly hostname: string;
  readonly cors?: boolean;
  readonly deno?: string;
  readonly permissions?: readonly string[];
  readonly args?: readonly string[];
}

export async function run(param: Param): Promise<Deno.ProcessStatus> {
  const {
    deno = "deno",
    permissions = [],
    args = [],
    cors = false,
    list = await getDefaultList(),
    hostname,
    port,
    onServe,
  } = param;

  const testFiles = list.map((filename) =>
    `http://${hostname}:${port}/${filename}`
  );
  if (!testFiles.length) throw "No tests.";

  const server = new FileServer({
    port,
    hostname,
    onServe,
    cors,
    target: ".",
  });

  return new Promise(async (resolve, reject) => {
    server.start().catch(reject);

    const cp = Deno.run({
      cmd: [
        deno,
        "test",
        `--reload=http://${hostname}:${port}`,
        `--allow-net=${hostname}:${port}`,
        ...permissions,
        ...testFiles,
        ...args,
      ],
      stdout: "inherit",
      stderr: "inherit",
      stdin: "inherit",
    });

    const status = await cp.status();
    server.stop();
    resolve(status);
  });
}

export default run;
