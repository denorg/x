export default async function sandbox<T>(fn: () => T): Promise<T> {
  try {
    return fn();
  } catch (err) {
    return Promise.reject(err);
  }
}
