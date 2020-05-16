export function* zip(...iterables: Array<Iterable<unknown>>) {
  const iterators = iterables.map(i => i[Symbol.iterator]());
  while (true) {
    const items = iterators.map(i => i.next());
    if (items.some(item => item.done)) {
      break;
    }
    yield items.map(i => i.value!);
  }
  // close all iterators
  for (const iterator of iterators) {
    if (typeof iterator.return === "function") {
      iterator.return();
    }
  }
}

export async function* asyncZip(...iterables: Array<AsyncIterable<unknown>>) {
  const iterators = iterables.map(i => i[Symbol.asyncIterator]());

  while (true) {
    const items: Array<IteratorResult<unknown>> = await Promise.all(
      iterators.map(async i => await i.next())
    );
    if (items.some(item => item.done)) {
      break;
    }
    yield items.map(i => i.value!);
  }
  // close all iterators
  for (const iterator of iterators) {
    if (typeof iterator.return === "function") {
      iterator.return();
    }
  }
}
