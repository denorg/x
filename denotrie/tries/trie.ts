import { TrieNode, TrieConfig, SearchResult } from './types.ts';

/**
 * Returns a new root node of the trie
 *
 * @typeparam T The generic type of values stored in Nodes.
 * @param trieConfig - Configuration of the trie
 * @returns a new root node of the trie
 */
export const init = <T>(
  trieConfig: TrieConfig = {
    ignoreCasing: true,
  },
): TrieNode<T> => ({
  children: {},
  ignoreCasing: trieConfig.ignoreCasing,
});

/**
 * Adding a key value pair to the trie
 *
 * @typeparam T The generic type of values stored in Nodes.
 * @param node - the root node of the trie to add to
 * @param key - the key to add to the trie
 * @param value - the value to add to the trie
 */
export const add = <T>(node: TrieNode<T>, key: string, value: T): void => {
  addRecursively(node, key, key, value);
};

/**
 * Get the value from the trie by a key
 *
 * @typeparam T The generic type of values stored in Nodes.
 * @param node - the root node of the trie to add to
 * @param key - the key used to retrieve from the trie
 * @returns - the value if key exists, undefine if not
 */
export const get = <T>(node: TrieNode<T>, key: string): T | undefined => {
  if (key.length === 0) {
    return node.value;
  }

  const cultureAwareKey = getCultureAwareKey(node, key);

  const matchChild = node.children[cultureAwareKey];
  if (matchChild) {
    return get(matchChild, key.slice(1, key.length));
  }
};

/**
 * Search the value from the trie by a keyword
 *
 * @typeparam T The generic type of values stored in Nodes.
 * @param node - the root node of the trie to add to
 * @param keyword - the keyword used to search from the trie
 * @returns - the search result with their corresponding keys
 */
export const search = <T>(node: TrieNode<T>, keyword: string): SearchResult<T>[] =>
  searchRecursively(node, keyword, keyword).map(({ key, value }) => ({ key, value }));

const searchRecursively = <T>(
  node: TrieNode<T>,
  keyword: string,
  originalKeyword: string,
): SearchResult<T>[] => {
  let results: SearchResult<T>[] = [];

  // when keyword has all been matched, recursively look for values at
  // end nodes
  if (keyword.length === 0) {
    return applyEndWildcard(node);
  }

  const cultureAwareKeyword = getCultureAwareKey(node, keyword);

  const matchChild = node.children[cultureAwareKeyword];
  if (matchChild) {
    const result = matchNext(matchChild, keyword, originalKeyword);
    results = results.concat(result);
  }

  // should only run the wildcard match if the keyword has not been sliced
  if (keyword === originalKeyword) {
    const childResults = applyStartWildcard(node, cultureAwareKeyword, keyword, originalKeyword);

    results = results.concat(childResults);
  }

  return results;
};

const addRecursively = <T>(
  node: TrieNode<T>,
  key: string,
  originalKey: string,
  value: T,
): TrieNode<T> => {
  if (key.length === 0) {
    node.key = originalKey;
    node.value = value;
    return node;
  }

  const cultureAwareKey = getCultureAwareKey(node, key);

  const matchChild = node.children[cultureAwareKey];
  if (matchChild) {
    return addRecursively(matchChild, key.slice(1, key.length), originalKey, value);
  } else {
    const newNode = {
      parent: node,
      children: {},
      ignoreCasing: node.ignoreCasing,
      key: key.length === 1 ? originalKey : undefined,
      value: key.length === 1 ? value : undefined,
    };
    node.children[cultureAwareKey] = newNode;
    return addRecursively(newNode, key.slice(1, key.length), originalKey, value);
  }
};

const applyStartWildcard = <T>(
  node: TrieNode<T>,
  cultureAwareKeyword: string,
  keyword: string,
  originalKeyword: string,
): SearchResult<T>[] => {
  const childrenResults = Object.entries(node.children)
    .map(([key, child]) =>
      key !== cultureAwareKeyword ? searchRecursively(child, keyword, originalKeyword) : [],
    )
    .flat();

  return childrenResults;
};

const applyEndWildcard = <T>(node: TrieNode<T>): SearchResult<T>[] => {
  let fetchResult: SearchResult<T>[] = [];

  const { key, value } = node;

  if (key && value) {
    fetchResult.push({ key, value });
  }

  Object.values(node.children).forEach((child) => {
    fetchResult = fetchResult.concat(applyEndWildcard(child));
  });

  return fetchResult;
};

const matchNext = <T>(
  matchChild: TrieNode<T>,
  keyword: string,
  originalKeyword: string,
): SearchResult<T>[] => {
  let result = searchRecursively(matchChild, keyword.slice(1, keyword.length), originalKeyword);

  // will need to step back one character when the path does not return anything
  // and retry on the current node
  if (result.length === 0) {
    result = searchRecursively(matchChild, keyword, originalKeyword);
  }

  return result;
};

const getCultureAwareKey = <T>(node: TrieNode<T>, key: string): string =>
  node.ignoreCasing ? key[0].toLowerCase() : key[0];
