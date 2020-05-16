// Types
import { IndigobirdPropsConfig, IndigobirdPropsHandler } from './types';
import { IndigobirdAllHandler } from '../all/types';

// Functions
import all from '../all';

async function any<T, I extends any, K extends string | number | symbol>(
  items: { [key in K]: I },
  handler?: IndigobirdPropsHandler<T, I, K>,
  config: IndigobirdPropsConfig = {}
): Promise<{ [key in K]: T }> {
  const keys: K[] = Object.keys(items) as K[];
  const values = keys.reduce((arr: I[], key) => {
    arr.push(items[key]);
    return arr;
  }, []);

  // Wrap the handler so as to pass in the corresponding key, rather
  // than the corresponding index.
  const wrappedHandler: IndigobirdAllHandler<T, I> | undefined = handler
    ? (item, index) => handler(item, keys[index])
    : undefined;

  const results = await all(values, wrappedHandler, config);

  return results.reduce((agg: { [key in K]: T }, result, i) => {
    const key = keys[i];
    agg[key] = result;
    return agg;
  }, {} as { [key in K]: T });
}

export default any;
