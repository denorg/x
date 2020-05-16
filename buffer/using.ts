// this code from https://gist.github.com/dsherret/cf5d6bec3d0f791cef00

/**
 * Provides a mechanism for releasing resources.
 */
export interface IDisposable {
  dispose() : void;
}

/**
 * Provides a convenient syntax that ensures the correct use of IDisposable objects
 */

export function using<T extends IDisposable>(
  resource: T,
  func: (resource: T) => void
) {
  try {
    func(resource);
  } finally {
    resource.dispose();
  }
}
// example
