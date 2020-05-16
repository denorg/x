// Types
import { IndigobirdSomeConfig, IndigobirdSomeHandler } from './types';
import sandbox from '@/utils/sandbox';

/**
 * Executes `concurrency` number of handlers/items simultaneously.
 * Will resolve as soon as `amount` number have resolved successfully.
 * Will only error if number have errored `items.length` - `amount`,
 * such that it is not possible for `amount` to resolve.
 * @param items The items to handle.
 * @param handler Optional handler which will be passed the current item.
 * @param config Configuration.
 */
async function some<T extends any, I extends any>(
  items: I[],
  handlerOrConfig?: IndigobirdSomeHandler<T, I> | IndigobirdSomeConfig | null,
  configOr?: IndigobirdSomeConfig
): Promise<T[]> {
  // Resolve ambiguous args
  const handler: IndigobirdSomeHandler<T, I> | null = (handlerOrConfig && (typeof handlerOrConfig === 'function'))
                                                      ? handlerOrConfig
                                                      : null;
  const config: IndigobirdSomeConfig | {} = (handler || configOr)
                                            ? (configOr || {})
                                            : (handlerOrConfig || {});

  const { concurrency = Infinity, amount = items.length } = config as IndigobirdSomeConfig;
  if (!items.length) return [];
  if (concurrency < 1)
    return Promise.reject(new Error('Cannot execute indigobird.some, provided concurrency cannot be less than 1.'));
  if (amount > items.length)
    return Promise.reject(
      new Error(
        `Cannot execute indigobird.some, provided amount (${amount}) necessary to resolve cannot exceed the amount of provided items (${items.length}).`
      )
    );

  const resolutions: T[] = [];
  const errors: Error[] = [];
  const maxNumberOfErrors = items.length - amount;
  let firstError: Error;

  const activity = {
    hasCompleted: false, // Has either succeeded or errored enough in order to complete
    // Have begun executing.
    started: 0,
    // Currently executing.
    executing: 0,
    resolved: 0, // Keep track numerically, rather than resolutions.length, as it is a sparse array.
    errored: 0, // Keep track numerically, rather than errors.length, as it is a spare array.
  };

  return new Promise((resolve, reject) => {
    executeNextHandler();

    async function executeNextHandler() {
      if (activity.hasCompleted) return;
      if (activity.executing === concurrency) return;
      if (activity.started === items.length) return;

      const index = activity.started++;
      const currentItem = items[index];
      activity.executing++;

      sandbox(() => (handler ? handler(currentItem, index) : currentItem)).then(
        (result) => {
          if (activity.hasCompleted) return;
          activity.executing--;
          activity.resolved++;
          resolutions[index] = result as T;

          if (activity.resolved === amount) {
            activity.hasCompleted = true;
            resolve(resolutions);
          } else executeNextHandler();
        },
        (err) => {
          if (activity.hasCompleted) return;
          firstError = firstError || err;
          activity.executing--;
          activity.errored++;
          errors[index] = err;

          if (activity.errored > maxNumberOfErrors) {
            activity.hasCompleted = true;
            // @ts-ignore
            firstError.errors = errors;
            reject(firstError);
          } else executeNextHandler();
        }
      );

      executeNextHandler();
    }
  });
}

export default some;
