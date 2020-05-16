import 'mocha';
import { expect } from 'chai';

import { reduce } from '../../lib';

describe('Invocation', () => {
  it('should be able to be executed.', () => {
    return reduce([1, 2, 3], () => {
      return 0;
    }, 0);
  });

  it ('should be able to be executed with a handler and config', () => {
    return reduce([1, 2, 3], () => {
      return 0;
    }, 0, { amount: 2, concurrency: 1 });
  });
});
