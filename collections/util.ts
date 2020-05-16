// Convert Array to AsyncIterator
export async function* from<T>(values: T[]) {
  for (const item of values) {
    yield item;
  }
}
