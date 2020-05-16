// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.
import { Logger } from "./logger.ts";
import {
  BaseHandler,
  ConsoleHandler,
  WriterHandler,
  FileHandler
} from "./handlers.ts";

export class LoggerConfig {
  level?: string;
  handlers?: string[];
}

export interface LogConfig {
  handlers?: {
    [name: string]: BaseHandler;
  };
  loggers?: {
    [name: string]: LoggerConfig;
  };
}

const DEFAULT_LEVEL = "INFO";
const DEFAULT_CONFIG: LogConfig = {
  handlers: {
    default: new ConsoleHandler(DEFAULT_LEVEL)
  },

  loggers: {
    default: {
      level: DEFAULT_LEVEL,
      handlers: ["default"]
    }
  }
};

const state = {
  handlers: new Map<string, BaseHandler>(),
  loggers: new Map<string, Logger>(),
  config: DEFAULT_CONFIG
};

export const handlers = {
  BaseHandler,
  ConsoleHandler,
  WriterHandler,
  FileHandler
};

export function getLogger(name?: string): Logger {
  if (!name) {
    return state.loggers.get("default")!;
  }

  if (!state.loggers.has(name)) {
    const logger = new Logger("NOTSET", []);
    state.loggers.set(name, logger);
    return logger;
  }

  return state.loggers.get(name)!;
}

export const debug = (msg: string, ...args: unknown[]): void =>
  getLogger("default").debug(msg, ...args);
export const info = (msg: string, ...args: unknown[]): void =>
  getLogger("default").info(msg, ...args);
export const warning = (msg: string, ...args: unknown[]): void =>
  getLogger("default").warning(msg, ...args);
export const error = (msg: string, ...args: unknown[]): void =>
  getLogger("default").error(msg, ...args);
export const critical = (msg: string, ...args: unknown[]): void =>
  getLogger("default").critical(msg, ...args);

export async function setup(config: LogConfig): Promise<void> {
  state.config = {
    handlers: { ...DEFAULT_CONFIG.handlers, ...config.handlers },
    loggers: { ...DEFAULT_CONFIG.loggers, ...config.loggers }
  };

  // tear down existing handlers
  state.handlers.forEach((handler): void => {
    handler.destroy();
  });
  state.handlers.clear();

  // setup handlers
  const handlers = state.config.handlers || {};

  for (const handlerName in handlers) {
    const handler = handlers[handlerName];
    await handler.setup();
    state.handlers.set(handlerName, handler);
  }

  // remove existing loggers
  state.loggers.clear();

  // setup loggers
  const loggers = state.config.loggers || {};
  for (const loggerName in loggers) {
    const loggerConfig = loggers[loggerName];
    const handlerNames = loggerConfig.handlers || [];
    const handlers: BaseHandler[] = [];

    handlerNames.forEach((handlerName): void => {
      if (state.handlers.has(handlerName)) {
        handlers.push(state.handlers.get(handlerName)!);
      }
    });

    const levelName = loggerConfig.level || DEFAULT_LEVEL;
    const logger = new Logger(levelName, handlers);
    state.loggers.set(loggerName, logger);
  }
}

setup(DEFAULT_CONFIG);
