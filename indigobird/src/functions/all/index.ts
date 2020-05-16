// Types
import { IndigobirdAllConfig, IndigobirdAllHandler } from './types';

// Functions
import some from '../some';

async function all<T, I extends any>(
  items: I[],
  handlerOrConfig?: IndigobirdAllHandler<T, I> | IndigobirdAllConfig | null,
  configOr?: IndigobirdAllConfig
): Promise<T[]> {
  // Resolve ambiguous args
  const handler: IndigobirdAllHandler<T, I> | null = (handlerOrConfig && (typeof handlerOrConfig === 'function'))
                                                      ? handlerOrConfig
                                                      : null;
  const config: IndigobirdAllConfig | {} = (handler || configOr)
                                            ? (configOr || {})
                                            : (handlerOrConfig || {});

  return some(items, handler, {
    ...config,
    amount: items.length,
  });
}

export default all;
