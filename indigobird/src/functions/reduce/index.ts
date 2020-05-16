// Types
import { IndigobirdReduceConfig, IndigobirdReduceHandler } from './types';
import { IndigobirdSomeHandler } from '../some/types';

// Functions
import some from '../some';


async function reduce<T, I extends any>(
  items: I[],
  handler: IndigobirdReduceHandler<T, I>,
  initialValue: T,
  config: IndigobirdReduceConfig = {}
): Promise<T> {
  let aggregate = initialValue;

  // Because this is mean for asynchronous tasks, we provide a getter rather than the aggregate value,
  // so that when it comes time for the handler to do something with the aggregate value, it will
  // take into consideration any parallel executions which have taken place and returned new aggregates
  // in the meantime, rather than having captured a closured version of the aggregate as it was when
  // the handler was first invoked, which could have since become out of sync.
  const getAggregate = () => aggregate;
  const someHandler: IndigobirdSomeHandler<T, I> = async (currentItem: I, index: number) => {
    // Wrap handler in a promise and timeout to remove synchronous handlers from synchronous
    // execution, in order to guarantee asynchronous execution of handler. Otherwise two or
    // more synchronous handlers could resolve without either of them having updated the
    // aggregate.
    const newAggregate: T = await new Promise((resolve) => {
      setTimeout(() => resolve(handler(getAggregate, currentItem, index)), 0);
    });
    return aggregate = newAggregate;
  };

  await some(items, someHandler, {
    ...config,
    amount: items.length,
  });

  return aggregate;
}

export default reduce;
