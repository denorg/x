import { Response, Status } from "./deps.ts";
import contentType from "./content-type.ts";

export async function serveFile(filePath: string): Promise<Response> {
  const [file, fileInfo] = await Promise.all([
    Deno.open(filePath),
    Deno.stat(filePath),
  ]);
  const headers = new Headers();
  headers.set("content-length", fileInfo.size.toString());
  const contentTypeValue = contentType(filePath);
  if (contentTypeValue) {
    headers.set("content-type", contentTypeValue);
  }
  return {
    status: Status.OK,
    body: file,
    headers,
  };
}
export default serveFile;
