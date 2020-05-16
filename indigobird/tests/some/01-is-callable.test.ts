import 'mocha';
import { expect } from 'chai';

import { some } from '../../lib';

describe('Invocation', () => {
  it('should be able to be executed.', () => {
    return some([5]);
  });

  it ('should be able to be executed with a handler', () => {
    return some([1, 5, 0], (n) => n);
  });

  it ('should be able to be executed with a handler and config', () => {
    return some([1, 5, 0], (n) => n, { concurrency: Infinity });
  });

  it ('should be able to be executed with a null handler and config', () => {
    return some([1, 5, 0], null, { amount: 2 });
  });

  it ('should be able to be executed with config as a second argument', () => {
    return some([1, 5, 0], { concurrency: 2 });
  });
});
