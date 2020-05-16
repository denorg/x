# @gobengo/heap

A Min/Max Heap in TypeScript.

i.e. a collection of sorted values that requires O(n) space and supports the following operations:
 * buildHeap - Create Heap from initialValues in O(n) time
 * length - get number of items in collection in O(1) time
 * peek - get first item in collection in O(1) time
 * pop - remove the first item in collection in O(log(n)) time
 * push - add a new item to the collection in O(log(n)) time

Consider using it for algorithms that benefit from a a [Priority Queue](https://en.wikipedia.org/wiki/Priority_queue), e.g. [Djikstra's Algorithm for finding the shortest paths between nodes in a graph](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm).

It should work with [deno](https://deno.land/).

## Run Tests

`deno test heap.test.ts`

## Build

The following command will write an ES Module to stdout that you can use in many places (e.g. the browser, Node 14)

`deno bundle heap.ts`

Example:
```
deno bundle heap.ts > heap.mjs

node -e "(async () => { console.log(await import('./heap.mjs')) })()"

# [Module] {
#   Heap: [Function: Heap],
#   MaxHeap: [Function: MaxHeap],
#   MinHeap: [Function: MinHeap]
# }

```