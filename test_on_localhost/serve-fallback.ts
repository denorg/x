import { Response, Status } from "./deps.ts";
const encoder = new TextEncoder();
export function serveFallback(error: Error): Promise<Response> {
  if (error instanceof Deno.errors.NotFound) {
    return Promise.resolve({
      status: Status.NotFound,
      body: encoder.encode("Not found"),
    });
  } else {
    return Promise.resolve({
      status: Status.InternalServerError,
      body: encoder.encode("Internal server error"),
    });
  }
}
export default serveFallback;
