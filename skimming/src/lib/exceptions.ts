import { FetchOptions } from "./types.ts";

export class InvalidQuery extends Error {
  constructor(cause: string) {
    super(`Invalid query input. Cause: ${cause}.`);
    this.name = this.constructor.name;
  }
}

export class InvalidContext extends Error {
  constructor(cause: string) {
    super(`Invalid context. Cause: ${cause}.`);
    this.name = this.constructor.name;
  }
}

export class NotContentFound extends Error {
  constructor(url: string, doc: string) {
    super(`No content found at ${url}${doc}.`);
    this.name = this.constructor.name;
  }
}

export class NonMappedInstruction extends Error {
  static MAX_ITERATION: number = 1000;

  constructor(query: string, options: FetchOptions) {
    super(`Request exit to prevent crashing - query: ${query} - options: ${options}`);
    this.name = this.constructor.name;
  }
}
