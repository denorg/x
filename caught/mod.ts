const noop = () => {};

export function caught<T>(promise: Promise<T>): Promise<T> {
  promise.catch(noop);
  return promise;
}
