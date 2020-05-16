import {
  ServerRequest,
  Response,
  Status,
  posix,
  serve,
  assert,
} from "./deps.ts";
import serveFile from "./serve-file.ts";
import serveFallback from "./serve-fallback.ts";
import setCORS from "./set-cors.ts";

export class FileServer {
  readonly #param: Param;
  #stop: boolean = false;

  constructor(param: Param) {
    this.#param = param;
  }

  public async start() {
    this.#stop = false;
    const server = serve({
      port: this.#param.port,
      hostname: this.#param.hostname,
    });

    for await (const req of server) {
      if (this.#stop) break;

      let normalizedUrl = posix.normalize(req.url);
      try {
        normalizedUrl = decodeURIComponent(normalizedUrl);
      } catch (e) {
        if (!(e instanceof URIError)) {
          throw e;
        }
      }

      const fsPath = posix.join(this.#param.target, normalizedUrl);

      let response: Response | undefined;
      try {
        const info = await Deno.stat(fsPath);
        if (info.isDirectory) {
          response = {
            status: Status.Forbidden,
            body: "Cannot serve directory",
          };
        } else {
          response = await serveFile(fsPath);
        }
      } catch (error) {
        this.#param.onError?.(error);
        response = await serveFallback(error);
      } finally {
        if (this.#param.cors) {
          assert(response);
          setCORS(response);
        }
        this.#param.onServe?.(req, response!);
        req.respond(response!);
      }
    }
  }

  public stop() {
    this.#stop = true;
  }
}

export interface Param {
  readonly onError?: (error: any) => void;
  readonly onServe?: (request: ServerRequest, response: Response) => void;
  readonly port: number;
  readonly hostname?: string;
  readonly target: string;
  readonly cors: boolean;
}

export default FileServer;
