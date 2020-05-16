export interface TrieNode<T> {
  parent?: TrieNode<T>;
  children: { [key: string]: TrieNode<T> };
  key?: string;
  value?: T;
  ignoreCasing: boolean;
}

export interface SearchResult<T> {
  key: string;
  value: T;
}

export interface TrieConfig {
  ignoreCasing: boolean;
}
