# DataBatcher

The ideas of DataLoader but applied to both loading and saving.

# Example Usage

```js
import { DataBatcher } from "./mod.ts";

const example = { 1: "one", 3: "three" };

async function loadBatch(ids: [number]) {
  // do some fancy work here to fetch all records with the given ids
  // if record is not found for a given id, then return null, or if an error occurs
  return ids.map(id => example[id] || null);
}

async function saveBatch(writes: [any,any][]) {
  // do something super fancy to perform the writes in batch
  // Returning an Error if something goes wrong
  return writes.map(([key, value]) => {
    example[key] = value;
  });
}

async function run() {
  const batcher = new DataBatcher(loadBatch, saveBatch);

  const loaded = await Promise.all([
    batcher.load(1), // one
    batcher.load(2), // null
    batcher.load(3) // three
  ]); 
  console.log(loaded); // [ "one", null, "three" ] 

  // Make change
  await batcher.save(2, "TWO");

  // Load changed, note it is no longer null
  console.log(await batcher.load(2)); // TWO
}

run();
```
