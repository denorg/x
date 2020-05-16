import { Context } from "./types.ts";
import { InvalidQuery, InvalidContext } from "./exceptions.ts";
import { DEFAULT_TRIM, DEFAULT_PREVIEW_LENGTH, DEFAULT_REGEX } from "../skimming.ts";

export const LINE_BREAK = "\n";
export const LAST_LINE = "$";
export const REGEX_ESCAPE = /[.*+?^${}()|[\]\\]/g;

export function validateQuery(query: string, limit?: number): void {
  if (!query.length) {
    throw new InvalidQuery("it is empty");
  }

  if (limit && query.length > limit) {
    throw new InvalidQuery(`it exceeds the limit of ${limit}`);
  }
}

export function validateContext(context: Context): void {
  if (!context.url.length) {
    throw new InvalidContext("url is empty");
  }

  context.files.forEach(file => {
    if (!file.length) {
      throw new InvalidContext("file name is empty");
    } else {
      if (!context.url.endsWith("/") && !file.startsWith("/")) {
        throw new InvalidContext(`this enpoint might not work: ${context.url}${file}`);
      }
    }
  });
}

export function extractSegment(
  from: string, 
  query: string,
  previewLength: number = DEFAULT_PREVIEW_LENGTH, 
  trimContent: boolean = DEFAULT_TRIM
  ): string {
  
  let offset;
  if (previewLength === -1) {
    // Find the last line position
    const lastPos = from.trimLeft().search(LINE_BREAK);
    offset = from.substring(0, lastPos > 0 ? lastPos + 1 : from.search(LAST_LINE));
  } else {
    if (trimContent) {
      offset = from.trimLeft().substring(0, from.trimLeft().indexOf(LINE_BREAK) + previewLength);
    } else {
      offset = from.trimLeft().substring(0, previewLength === 0 ? query.length : previewLength);
    }
  }

  // Find the last line position in a multiline content
  const lastLine = offset.lastIndexOf(LINE_BREAK);

  /* Extract content segment from the found query to the last complete line,
   * However, if the previewLenght is shorter than the size of this line, it will display the established range.
   */
  return (trimContent ? offset.substring(0, lastLine > 0 ? lastLine : offset.length) : offset).trim();
}

export function findFirstPos(
  contentToFetch: string, 
  query: string, 
  trimContent: boolean = DEFAULT_TRIM,
  regex: boolean = DEFAULT_REGEX, 
  next: boolean = false): number {
  let foundIndex = regex ? contentToFetch.search(query) : contentToFetch.search(query.replace(REGEX_ESCAPE, '\\$&'));

  if (trimContent && foundIndex != -1) {
    let firstPos = next ? foundIndex : 0;
    for (let index = foundIndex; index >= 0; index--) {
      if (contentToFetch.charAt(index) == '\n') {
        firstPos = index;
        break;
      }
    }
    return firstPos;
  }
  return foundIndex;
}