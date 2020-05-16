export type Context = {
  url: string;
  files: string[];
};

export type Output = {
  file: string;
  segment: string[];
  found: number;
  cache: boolean;
};

export type Cache = {
  query: string;
  output: Output[];
  previewLength: number;
  ignoreCase: boolean;
  trimContent: boolean;
  exp: number;
};

/**
 * @param size Limit of entries stored in cache
 * @param expireDuration Duration in seconds that the cache will be used
 */
export type CacheOptions = {
  size: number;
  expireDuration: number;
};

/**
 * @param trimContent When true it will exclude incomplete lines.
 * @param previewLength If equals to 0, it will extract only the query as a segment.
 * If equals to -1, it will show the entire line until the first line break.
 */
export type FetchOptions = {
  ignoreCase?: boolean;
  trimContent?: boolean;
  previewLength?: number;
  regex?: boolean;
};
